import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';
import { Job } from '../student-profile/job';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { GiveJobsToStudentService } from '../giveJobToStudent.service';


@Component({
  selector: 'app-job-portal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './job-portal.component.html',
  styleUrl: './job-portal.component.css'
})
export class JobPortalComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  filter: string = '';
  selectedJob: number | null = null;

  filters = {
    salaryMin: null as number | null,
    salaryMax: null as number | null,
    branch: '',
    location: '',
    type: ''
  };

  constructor(
    private studentService: StudentService,
    private router: Router,
    // private giveJobsToStudent: GiveJobsToStudentService,
  ) {}

  // ngOnInit() {
  //   this.studentService.getJobs().subscribe(jobs => {
  //     this.jobs = jobs;
  //     this.filteredJobs = jobs;
  //   });
  // }

  // filterJobs() {
  //   this.filteredJobs = this.jobs.filter(job =>
  //     job.companyName.toLowerCase().includes(this.filter.toLowerCase()) ||
  //     job.jobRole.toLowerCase().includes(this.filter.toLowerCase())
  //   );
  // }

  // applyFilters() {
  //   this.filteredJobs = this.jobs.filter(job => {
  //     // Salary Filter
  //     const salaryMatch = (!this.filters.salaryMin || job.salary >= this.filters.salaryMin) &&
  //                        (!this.filters.salaryMax || job.salary <= this.filters.salaryMax);

  //     // Branch Filter
  //     const branchMatch = !this.filters.branch || job.branch === this.filters.branch;

  //     // Location Filter
  //     const locationMatch = !this.filters.location || 
  //                          job.location.toLowerCase().includes(this.filters.location.toLowerCase());

  //     // Job Type Filter
  //     const typeMatch = !this.filters.type || job.type === this.filters.type;

  //     return salaryMatch && branchMatch && locationMatch && typeMatch;
  //   });
  // }

  // resetFilters() {
  //   this.filters = { salaryMin: null, salaryMax: null, branch: '', location: '', type: '' };
  //   this.applyFilters();
  // }

  // toggleJobDetails(index: number) {
  //   this.selectedJob = this.selectedJob === index ? null : index;
  // }

  // applyToJob(job: Job) {
  //   this.router.navigate(['/apply-job', job.id]);
  //   // this.studentService.applyToJob(job).subscribe(response => {
      
  //   //   alert('Application submitted successfully!');
  //   // });
  // }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.studentService.getApprovedJobPostings().subscribe(
      (jobs) => {
        console.log('Raw jobs from API:', jobs);
        this.jobs = jobs.map(job => {
          const mappedJob = {
            id: job.id,
            jobPostId: job.id,
            companyName: job.companyName,
            jobRole: job.jobRole,
            eligibleCourses: job.eligibleCourses,
            lastDateToRegister: job.lastDateToRegister,
            annualCTC: job.annualCTC,
            jobLocation: job.jobLocation,
            rolesResponsibilities: job.rolesResponsibilities,
            roleDetails: job.roleDetails,
            website: job.website,
            companyProfile: job.companyProfile,
            batchYear: job.batchYear,
            skillsQualifications: job.skillsQualifications,
            selectionProcess: job.selectionProcess,
            registrationProcess: job.registrationProcess,
            benefitsIncentives: job.benefitsIncentives,
            expectedSkillsTools: job.expectedSkillsTools,
            status: job.status,
            salary: parseFloat(job.annualCTC) || 0,
            branch: job.eligibleCourses.split(',')[0],
            location: job.jobLocation,
            description: job.roleDetails || job.rolesResponsibilities,
            logo: 'https://via.placeholder.com/50',
            type: 'Full-time'
          };
          console.log('Mapped job:', mappedJob); // Debug each mapped job
          return mappedJob;
        });
        console.log('Final jobs array:', this.jobs);
        this.applyFilters();
      },
      (error) => console.error('Error loading jobs:', error)
    );
  }
  
  filterJobs() {
    this.filteredJobs = this.jobs.filter(job =>
      job.companyName.toLowerCase().includes(this.filter.toLowerCase()) ||
      job.jobRole.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const salaryMatch = (!this.filters.salaryMin || job.salary >= this.filters.salaryMin) &&
                         (!this.filters.salaryMax || job.salary <= this.filters.salaryMax);
      const branchMatch = !this.filters.branch || job.branch === this.filters.branch;
      const locationMatch = !this.filters.location || 
                           job.location.toLowerCase().includes(this.filters.location.toLowerCase());
      const typeMatch = !this.filters.type || job.type === this.filters.type;

      return salaryMatch && branchMatch && locationMatch && typeMatch;
    });
  }

  resetFilters() {
    this.filters = { salaryMin: null, salaryMax: null, branch: '', location: '', type: '' };
    this.applyFilters();
  }

  toggleJobDetails(index: number) {
    this.selectedJob = this.selectedJob === index ? null : index;
  }

  applyToJob(job: Job) {
    this.studentService.applyToJob(job.id).subscribe(
      () => {
        alert('Application submitted successfully!');
        this.router.navigate(['/applied-jobs']); // Redirect to applied jobs page
      },
      (error) => {
        console.error('Error applying to job:', error);
        alert('Failed to apply. Please try again.');
      }
    );
  }
}