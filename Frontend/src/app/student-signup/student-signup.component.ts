// import { Component } from '@angular/core';
// import { Router } from '@angular/router'; // Import the Router

// @Component({
//   selector: 'app-student-signup',
//   standalone: true,
//   imports: [],
//   templateUrl: './student-signup.component.html',
//   styleUrl: './student-signup.component.css'
// })
// export class StudentSignupComponent {
//   constructor(private router: Router) {} // Inject the Router service

//   navigateTo(route: string) {
//     this.router.navigate([route]); // Use this.router to navigate
//   }
// }


import { Component, OnInit} from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtService } from '../service/jwt.service';
import { Router } from '@angular/router'; // Import the Router
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-student-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    CommonModule,
    MatIconModule
  ],
  templateUrl: './student-signup.component.html',
  styleUrl: './student-signup.component.css'
})
export class StudentSignupComponent implements OnInit {

  signupForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private service: JwtService,
    private fb: FormBuilder
  ) { }

  navigateTo(route: string) {
    this.router.navigate([route]); // Use this.router to navigate
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
    //confirmPassword: ['', [Validators.required]],
    //, { validator: this.passwordMatchValidator }
  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('password')?.value;
  //   const confirmPassword = formGroup.get('confirmPassword')?.value;
  //   if (password !== confirmPassword) {
  //     formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  //   } else {
  //     formGroup.get('confirmPassword')?.setErrors(null);
  //   }
  // }

  // submitForm() {
  //   console.log(this.signupForm.value);
  //   this.service.register(this.signupForm.value).subscribe(
  //     (response) => {
  //       if (response.id != null) {
  //         alert(console.log("Hello " + response.name));
  //         this.router.navigateByUrl("/student-admin");
  //       }
  //     },
  //     (error) => {
  //       alert("Error: " + error.error.message);
  //     }
  //   );
  // }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.submitForm();  
    } else {
      console.log('Form is invalid');
    }
  }

  // submitForm() {
  //   console.log(this.signupForm.value);
  //   this.service.register(this.signupForm.value).subscribe({
  //     next: (response) => {
  //       if (response.id != null) {
  //         alert("Hello " + response.name);
  //         this.router.navigateByUrl("/login");
  //       }
  //     },
  //     error: (error) => {
  //       alert('Signup failed: ' + (error.error?.message || 'Unknown error'));
  //     }
  //   });
  // }

  submitForm(): void {
    this.service.register(this.signupForm.value).subscribe(
      (response: any) => {
        // console.log('Registration successful, awaiting OTP verification:', response);
        alert('Registration successful');
        this.isLoading = false;
        console.log('Redirecting to login page');
        this.router.navigateByUrl('/login').then(
          success => console.log('Navigation Success:', success),
          error => console.error('Navigation Error:', error)
        );
      },
      (error: any) => {
        console.error('Error during registration:', error);
        this.isLoading = false;
      }
    );
  }

}