from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas, auth

router = APIRouter(prefix="/feedback", tags=["Feedback"])

# ─────────────────────────────────────────────
# 1. Manager Creates Feedback
# ─────────────────────────────────────────────
@router.post("/", response_model=schemas.FeedbackOut)
def create_feedback(
    feedback: schemas.FeedbackCreate,
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can give feedback.")

    employee = db.query(models.User).filter(models.User.id == feedback.employee_id).first()
    if not employee or employee.manager_id != current_user.id:
        raise HTTPException(status_code=404, detail="Employee not found or not under this manager.")

    fb = models.Feedback(
        employee_id=feedback.employee_id,
        manager_id=current_user.id,
        strengths=feedback.strengths,
        improvements=feedback.improvements,
        sentiment=feedback.sentiment
    )
    db.add(fb)
    db.commit()
    db.refresh(fb)
    return fb

# ─────────────────────────────────────────────
# 2. Manager/Employee View Feedback (with acknowledgment)
# ─────────────────────────────────────────────
@router.get("/my", response_model=List[schemas.FeedbackOut])
def get_my_feedback(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    feedbacks = []

    if current_user.role == "employee":
        all_feedbacks = db.query(models.Feedback).filter(models.Feedback.employee_id == current_user.id).all()
        for fb in all_feedbacks:
            acknowledged = db.query(models.Acknowledgement).filter_by(
                feedback_id=fb.id,
                employee_id=current_user.id
            ).first() is not None
            setattr(fb, "acknowledged", acknowledged)
            feedbacks.append(fb)
        return feedbacks

    elif current_user.role == "manager":
        all_feedbacks = db.query(models.Feedback).filter(models.Feedback.manager_id == current_user.id).all()
        for fb in all_feedbacks:
            fb.acknowledged = db.query(models.Acknowledgement).filter_by(
                feedback_id=fb.id, employee_id=fb.employee_id
            ).first() is not None
            feedbacks.append(fb)  # Not needed for managers
        return all_feedbacks

# ─────────────────────────────────────────────
# 3. Manager Edits Feedback
# ─────────────────────────────────────────────
@router.put("/{feedback_id}", response_model=schemas.FeedbackOut)
def update_feedback(
    feedback_id: int,
    update_data: schemas.FeedbackCreate,
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    fb = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not fb or fb.manager_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to edit this feedback.")

    fb.strengths = update_data.strengths
    fb.improvements = update_data.improvements
    fb.sentiment = update_data.sentiment
    db.commit()
    db.refresh(fb)
    return fb

# ─────────────────────────────────────────────
# 4. Manager Views Team Feedback Summary
# ─────────────────────────────────────────────
@router.get("/manager/team-feedback-summary")
def team_feedback_summary(
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can view this")

    team = db.query(models.User).filter(models.User.manager_id == current_user.id).all()
    summary = []

    for emp in team:
        feedbacks = db.query(models.Feedback).filter(models.Feedback.employee_id == emp.id).all()
        sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}

        for fb in feedbacks:
            sentiment_counts[fb.sentiment] += 1

        summary.append({
            "employee_id": emp.id,
            "employee_name": emp.name,
            "total_feedbacks": len(feedbacks),
            "sentiments": sentiment_counts
        })

    return summary

# ─────────────────────────────────────────────
# 5. Employee Acknowledges Feedback
# ─────────────────────────────────────────────
@router.post("/{feedback_id}/acknowledge")
def acknowledge_feedback(
    feedback_id: int,
    db: Session = Depends(auth.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can acknowledge feedback.")

    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback or feedback.employee_id != current_user.id:
        raise HTTPException(status_code=404, detail="Feedback not found.")

    existing = db.query(models.Acknowledgement).filter_by(
        feedback_id=feedback_id,
        employee_id=current_user.id
    ).first()

    if existing:
        return {"msg": "Already acknowledged"}

    ack = models.Acknowledgement(feedback_id=feedback_id, employee_id=current_user.id)
    db.add(ack)
    db.commit()
    return {"msg": "Feedback acknowledged"}


