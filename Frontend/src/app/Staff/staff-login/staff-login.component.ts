import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent implements OnInit {

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
    });
  }
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
            this.router.navigateByUrl('/staff-dashboard').then(() => {
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