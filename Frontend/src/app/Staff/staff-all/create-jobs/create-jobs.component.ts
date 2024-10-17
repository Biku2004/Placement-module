import { Component  , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobService } from './job.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-jobs',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './create-jobs.component.html',
  styleUrl: './create-jobs.component.css'
})
export class CreateJobsComponent implements OnInit{
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
  jobPosts: any[] = [];
  constructor(
    private http: HttpClient,
    private jobService: JobService,
  ) {}

  // onSubmit() {
  //   this.http.post('http://localhost:8080/api/jobs', this.jobPosts)
  //     .subscribe(response => {
  //       console.log('Job post created:', response);
  //     }, error => {
  //       console.error('Error creating job post:', error);
  //     });
  // }

  onSubmit(): void {
    this.jobService.createJobPost(this.jobPost).subscribe(
      response => {
        console.log('Job post created:', response);
        this.loadJobPosts(); // Reload job posts after creating a new one
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
        }; // Reset the form
      },
      error => {
        console.error('Error creating job post:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadJobPosts();
  }

  loadJobPosts(): void {
    this.jobService.getJobPosts().subscribe(data => {
      this.jobPosts = data;
    });
  }

  reloadData(): void {
    this.loadJobPosts();
  }
}