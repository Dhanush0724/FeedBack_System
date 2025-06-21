// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'manager',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/manager/manager.component').then((m) => m.ManagerComponent),
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/employee/employee.component').then((m) => m.EmployeeComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
