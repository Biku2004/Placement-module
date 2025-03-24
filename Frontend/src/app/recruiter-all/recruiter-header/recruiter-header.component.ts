import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruiter-header.component.html',
  styleUrl: './recruiter-header.component.css'
})
export class RecruiterHeaderComponent {
name: string | null = null;
  role: string | null = null;
  profilePhoto: string | null = null;
  isDropdownOpen: boolean = false;

  constructor(private jwtService: JwtService, private router: Router) {}

  ngOnInit(): void {
    const userDetails = this.jwtService.getUserDetails();
    if (userDetails) {
      this.name = userDetails.name;
      this.role = userDetails.role;
    } else {
      this.name = localStorage.getItem('name');
      this.role = localStorage.getItem('role');
    }

    this.profilePhoto = localStorage.getItem('profilePhoto');
    this.loadProfileImage(); // Always fetch latest image
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
        this.profilePhoto = ''; // Fallback
        localStorage.removeItem('profilePhoto');
      }
    );
  }



  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.jwtService.logout();
    this.router.navigateByUrl('/staff-login');
    this.isDropdownOpen = false;
  }

  editProfile(): void {
    this.router.navigateByUrl('/recruiter-edit-profile');
    this.isDropdownOpen = false;
  }
}
