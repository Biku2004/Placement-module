// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RecruiterService } from '../recruiter.service';
// import { JwtService } from '../../service/jwt.service';

// @Component({
//   selector: 'app-job-posting',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './job-posting.component.html',
//   styleUrl: './job-posting.component.css'
// })
// export class JobPostingComponent {
//   job = {
//     title: '',
//     description: '',
//     eligibilityCriteria: '',
//     salary: '',
//     location: '',
//     applicationDeadline: '',
//   };
//   pdfFile: File | null = null;

//   constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {}

//   onFileChange(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files) this.pdfFile = input.files[0];
//   }

//   onSubmit() {
//     const recruiterId = this.jwtService.getUserDetails()?.email || '';
//     this.recruiterService.createJob(this.job, this.pdfFile, recruiterId).subscribe(
//       () => {
//         this.resetForm();
//         alert('Job posted successfully');
//       },
//       (error) => console.error('Error posting job:', error)
//     );
//   }

//   resetForm() {
//     this.job = { title: '', description: '', eligibilityCriteria: '', salary: '', location: '', applicationDeadline: '' };
//     this.pdfFile = null;
//   }

  
// }


import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../Staff/staff-all/create-jobs/job.service';
import { JwtService } from '../../service/jwt.service';


@Component({
  selector: 'app-job-posting',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './job-posting.component.html',
  styleUrl: './job-posting.component.css'
})
export class JobPostingComponent implements AfterViewInit {
  jobPost: any = {
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
    expectedSkillsTools: '',
    additionalSections: [],
  };
  jobPosts: any[] = [];
  @ViewChild('resizableContainer') resizableContainer!: ElementRef;
  private defaultWidth = 800;
  private defaultHeight = 400;
  selectedJob: any = null;

  constructor(private jobService: JobService, private jwtService: JwtService) {
    this.loadJobPosts();
  }

  loadJobPosts() {
    this.jobService.getJobPosts().subscribe(
      (data) => (this.jobPosts = data.map((job: any) => ({ ...job, selected: false }))),
      (error) => console.error('Error loading job posts:', error)
    );
  }

  onSubmit() {
    if (this.selectedJob) {
      this.jobService.updateJobPost(this.jobPost).subscribe(
        () => {
          this.loadJobPosts();
          this.resetForm();
          alert('Job updated successfully');
        },
        (error) => console.error('Error updating job:', error)
      );
    } else {
      this.jobService.createJobPost(this.jobPost).subscribe(
        () => {
          this.loadJobPosts();
          this.resetForm();
          alert('Job created successfully');
        },
        (error) => console.error('Error creating job:', error)
      );
    }
  }

  resetForm() {
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
      expectedSkillsTools: '',
      additionalSections: [],
    };
    this.selectedJob = null;
  }

  addSection() {
    this.jobPost.additionalSections.push({ label: '', value: '' });
  }

  editJob(job: any) {
    const userEmail = this.jwtService.getUserDetails()?.email;
    if (job.createdBy === userEmail) {
      this.selectedJob = job;
      this.jobPost = { ...job };
    }
  }

  deleteSelected() {
    const selectedJobs = this.jobPosts.filter((job) => job.selected);
    selectedJobs.forEach((job) =>
      this.jobService.deleteJobPost(job.id).subscribe(
        () => this.loadJobPosts(),
        (error) => console.error('Error deleting job:', error)
      )
    );
  }

  reloadData() {
    this.loadJobPosts();
  }

  resetSize() {
    const div = this.resizableContainer.nativeElement;
    div.style.width = `${this.defaultWidth}px`;
    div.style.height = `${this.defaultHeight}px`;
  }

  toggleSelectAll(event: any) {
    this.jobPosts.forEach((job) => (job.selected = event.target.checked));
  }

  ngAfterViewInit() {
    this.makeResizableDiv(this.resizableContainer.nativeElement);
  }

  makeResizableDiv(div: HTMLElement) {
    const resizers = div.querySelectorAll('.resizer');
    let originalWidth = 0, originalHeight = 0, originalMouseX = 0, originalMouseY = 0;

    resizers.forEach((resizer) => {
      resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        originalWidth = div.offsetWidth;
        originalHeight = div.offsetHeight;
        originalMouseX = (e as MouseEvent).clientX;
        originalMouseY = (e as MouseEvent).clientY;
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);

        function resize(e: MouseEvent) {
          if (resizer.classList.contains('bottom-right')) {
            div.style.width = originalWidth + (e.clientX - originalMouseX) + 'px';
            div.style.height = originalHeight + (e.clientY - originalMouseY) + 'px';
          } else if (resizer.classList.contains('right')) {
            div.style.width = originalWidth + (e.clientX - originalMouseX) + 'px';
          } else if (resizer.classList.contains('bottom')) {
            div.style.height = originalHeight + (e.clientY - originalMouseY) + 'px';
          }
        }

        function stopResize() {
          window.removeEventListener('mousemove', resize);
          window.removeEventListener('mouseup', stopResize);
        }
      });
    });
  }
}