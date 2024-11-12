import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recruiter-signup.component.html',
  styleUrls: ['./recruiter-signup.component.css']
})
export class RecruiterSignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['Recruiter', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      // Simulate an API call
      setTimeout(() => {
        this.isLoading = false;
        alert('Account created successfully!');
        this.router.navigate(['/studentlogin']);
      }, 2000);
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
