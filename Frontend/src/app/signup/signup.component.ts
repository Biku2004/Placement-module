import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
// import { StudentLoginComponent } from "../student-login/student-login.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router) {} // Inject the Router service

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }
}
