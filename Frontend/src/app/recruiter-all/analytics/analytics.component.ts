import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterService } from '../recruiter.service';
import { JwtService } from '../../service/jwt.service';


@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit {
  analytics: any;

  constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {}

  ngOnInit() {
    const recruiterId = this.jwtService.getUserDetails()?.email || '';
    this.recruiterService.getAnalytics(recruiterId).subscribe(
      (data) => (this.analytics = JSON.parse(data)),
      (error) => console.error('Error loading analytics:', error)
    );
  }
}
