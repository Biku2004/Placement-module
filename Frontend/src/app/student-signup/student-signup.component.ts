import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-student-signup',
  standalone: true,
  imports: [],
  templateUrl: './student-signup.component.html',
  styleUrl: './student-signup.component.css'
})
export class StudentSignupComponent {
  constructor(private router: Router) {} // Inject the Router service

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }
}
