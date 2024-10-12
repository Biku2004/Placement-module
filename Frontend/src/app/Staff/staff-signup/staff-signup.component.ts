import { Component, OnInit} from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router'; // Import the Router
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-staff-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule, 
    CommonModule,
    MatIconModule
  ],
  templateUrl: './staff-signup.component.html',
  styleUrl: './staff-signup.component.css'
})
export class StaffSignupComponent implements OnInit {

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

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.submitForm();  
    } else {
      console.log('Form is invalid');
    }
  }
  submitForm(): void {
    this.service.register(this.signupForm.value).subscribe(
      (response: any) => {
        // console.log('Registration successful, awaiting OTP verification:', response);
        alert('Staff Registration successful');
        this.isLoading = false;
        console.log('Redirecting to login page');
        this.router.navigateByUrl('/staff-login').then(
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