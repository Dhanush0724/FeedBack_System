import { Component } from '@angular/core';

@Component({
  selector: 'app-manager',
  imports: [],
  template: `
    <h2 class="text-2xl font-bold">Manager Dashboard</h2>
    <a routerLink="/feedback" class="text-blue-500">Give Feedback</a>
  `,
  standalone: true,
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
