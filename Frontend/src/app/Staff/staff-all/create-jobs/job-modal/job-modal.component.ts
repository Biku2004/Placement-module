// src/app/Staff/staff-all/job-modal/job-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css'],
  imports: [ CommonModule,FormsModule ]
})
export class JobModalComponent {
  @Input() jobPost = {
    companyName: '',
    website: '',
    companyProfile: '',
    eligibleCourses: '',
    batchYear: '',
    jobRole: '',
    jobLocation: '',
    annualCTC: '',
    rolesResponsibilities: '',
    skillsQualifications: '',
    selectionProcess: '',
    registrationProcess: '',
    lastDateToRegister: '',
    benefitsIncentives: '',
    roleDetails: '',
    expectedSkillsTools: ''
  };
  // @Input() jobPost: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  constructor(private jobService: JobService) {}

  closeModal(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.saveJob(this.jobPost); // Emit the updated job data
  }

  saveJob(updatedJob: any): void {
    this.jobService.updateJobPost(updatedJob).subscribe(() => {
      // this.loadJobPosts(); // Reload job posts to reflect the updated data
      this.jobPost = {
        companyName: '',
        website: '',
        companyProfile: '',
        eligibleCourses: '',
        batchYear: '',
        jobRole: '',
        jobLocation: '',
        annualCTC: '',
        rolesResponsibilities: '',
        skillsQualifications: '',
        selectionProcess: '',
        registrationProcess: '',
        lastDateToRegister: '',
        benefitsIncentives: '',
        roleDetails: '',
        expectedSkillsTools: ''
      };
      this.closeModal();
    }, error => {
      console.error('Error updating job post:', error);
    });
  }
}