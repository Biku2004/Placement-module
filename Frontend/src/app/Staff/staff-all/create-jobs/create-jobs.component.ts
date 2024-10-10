import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-jobs',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-jobs.component.html',
  styleUrl: './create-jobs.component.css'
})
export class CreateJobsComponent {
  jobPost = {
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

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/job-posts', this.jobPost)
      .subscribe(response => {
        console.log('Job post created:', response);
      }, error => {
        console.error('Error creating job post:', error);
      });
  }
}