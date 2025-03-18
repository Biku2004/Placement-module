import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { RecruiterService } from '../recruiter.service';
import { JobPostingService } from '../job-posting/job-posting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobApplication } from './job-application';

@Component({
  selector: 'app-job-applicants',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './job-applicants.component.html',
  styleUrl: './job-applicants.component.css'
})


export class JobApplicantsComponent implements OnInit {
  jobId: number | null = null;
  applications: JobApplication[] = [];
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recruiterService: JobPostingService
  ) {}

  ngOnInit(): void {
    // Get jobId from route params
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jobId) {
      this.loadApplications();
    } else {
      this.error = 'Invalid job ID';
    }
  }

  loadApplications(): void {
    if (this.jobId) {
      this.recruiterService.getJobPostingApplications(this.jobId).subscribe(
        (applications) => {
          console.log('Applications loaded:', applications);
          this.applications = applications;
        },
        (error) => {
          console.error('Error loading applications:', error);
          this.error = 'Failed to load applicants. Please try again.';
        }
      );
    }
  }
}