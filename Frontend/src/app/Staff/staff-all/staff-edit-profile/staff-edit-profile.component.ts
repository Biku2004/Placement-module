import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../service/jwt.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-staff-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './staff-edit-profile.component.html',
  styleUrls: ['./staff-edit-profile.component.css']
})
export class StaffEditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading: boolean = false;
  profilePhoto: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userDetails = this.jwtService.getUserDetails();
    this.profileForm = this.fb.group({
      fullName: [userDetails?.name || '', Validators.required],
      email: [userDetails?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: [''],
      bio: ['']
    });

    // Fetch existing profile data
    this.jwtService.getProfile().subscribe(
      (profile: any) => {
        if (profile) {
          this.profileForm.patchValue({
            fullName: profile.fullName,
            phoneNumber: profile.phoneNumber,
            address: profile.address,
            bio: profile.bio
          });
        }
        // Fetch profile image separately
        this.loadProfileImage();
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loadProfileImage(); // Still try to load image
      }
    );

    this.profilePhoto = localStorage.getItem('profilePhoto') || null;
  }

  loadProfileImage(): void {
    this.jwtService.getProfileImage().subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePhoto = reader.result as string;
          localStorage.setItem('profilePhoto', this.profilePhoto);
        };
        reader.readAsDataURL(blob);
      },
      (error) => {
        console.error('No profile image found:', error);
        this.profilePhoto = null; // Reset to null if no image
        localStorage.removeItem('profilePhoto');
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhoto = reader.result as string;
        localStorage.setItem('profilePhoto', this.profilePhoto); // Temporary preview
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('fullName', this.profileForm.get('fullName')?.value);
      formData.append('phoneNumber', this.profileForm.get('phoneNumber')?.value || '');
      formData.append('address', this.profileForm.get('address')?.value || '');
      formData.append('bio', this.profileForm.get('bio')?.value || '');
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.jwtService.updateProfile(formData).subscribe(
        (response: any) => {
          console.log('Profile updated:', response);
          localStorage.setItem('name', response.fullName);
          this.loadProfileImage(); // Refresh image after update
          this.isLoading = false;
          this.router.navigateByUrl('/staff-dashboard');
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          this.isLoading = false;
          alert('Failed to update profile: ' + (error.error?.message || 'Unknown error'));
        }
      );
    }
  }
}