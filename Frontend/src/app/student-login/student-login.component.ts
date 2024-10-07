import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  constructor(private router: Router) {} // Inject the Router service

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }
}
