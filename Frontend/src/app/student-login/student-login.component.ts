// import { Component } from '@angular/core';
// import { Router } from '@angular/router'; // Import the Router

// @Component({
//   selector: 'app-student-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './student-login.component.html',
//   styleUrl: './student-login.component.css'
// })
// export class StudentLoginComponent {
//   constructor(private router: Router) {} // Inject the Router service

//   navigateTo(route: string) {
//     this.router.navigate([route]); // Use this.router to navigate
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';
import { CommonModule } from '@angular/common';
// import { Role } from 'discord.js';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  // submitForm() {
  //   console.log('Form submitted', this.loginForm.value);
  //   this.service.login(this.loginForm.value).subscribe(
  //     (response) => {
  //       console.log('Login response', response);
  //       if (response.jwt != null) {
  //         console.log("Hello, Your token is " + response.jwt);
  //         const jwtToken = response.jwt;
  //         localStorage.setItem('jwt', jwtToken);
  //         alert(`Welcome, ${response.name}!`);
  //         alert('Navigating to /student-dashboard');
  //         this.router.navigateByUrl("/student-dashboard");
  //       }
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = this.loginForm.value;
      console.log('Form Values:', loginData);

      this.service.login(loginData).subscribe(
        (response: any) => {
          console.log('Login Response:', response);
          if (response && response.jwtToken) {
            localStorage.setItem('jwt', response.jwtToken);
            this.router.navigateByUrl('/student-dashboard').then(() => {
              this.isLoading = false;
            });
          } else {
            console.error('JWT not found in response:', response);
            alert('Login failed: JWT token not found in response.');
            this.isLoading = false;
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      );
    } else {
      console.log('Form is invalid:', this.loginForm.errors);
      alert('Please fill out all required fields correctly.');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }
}