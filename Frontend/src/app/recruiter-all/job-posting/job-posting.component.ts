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
import { JobPostingService } from './job-posting.service';
import { JwtService } from '../../service/jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-posting',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './job-posting.component.html',
  styleUrl: './job-posting.component.css'
})
export class JobPostingComponent implements AfterViewInit {
  jobPosting: any = {
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
  jobPostings: any[] = [];
  @ViewChild('resizableContainer') resizableContainer!: ElementRef;
  private defaultWidth = 800;
  private defaultHeight = 400;
  selectedJob: any = null;
  isRecruiterOrStaff: boolean = false;
  logo: string | null = null;
  logoPreview: string | null = null;
  selectedFile: File | null = null;

  selectedBatchYear: string = '';
  batchYears: string[] = [];
  archiveYearInput: string = '';



  constructor(
    private jobService: JobPostingService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.loadJobPostings();

    const token = localStorage.getItem('jwt');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT Payload:', payload); // Debug roles
      this.isRecruiterOrStaff = payload.roles?.includes('Recruiter') || payload.roles?.includes('Staff');
    }
  }

  // loadJobPostings() {
  //   this.jobService.getAllJobPostings().subscribe(
  //     (data) => (this.jobPostings = data.map((job: any) => ({ ...job, selected: false }))),
  //     (error) => console.error('Error loading job postings:', error)
  //   );
  // }

  ngOnInit() {
    this.loadBatchYears();
    this.loadJobPostings();
  }

  loadBatchYears() {
    this.jobService.getBatchYears().subscribe(
        years => {
            console.log('Batch years received:', years);
            this.batchYears = years;
        },
        error => console.error('Error loading batch years:', error)
    );
  }


  // loadJobPostings() {
  //   this.jobService.getJobPostings(this.selectedBatchYear).subscribe(
  //       (data) => {
  //           this.jobPostings = data.map((job: any) => ({
  //               ...job,
  //               selected: false,
  //               logoUrl: job.logo ? `data:image/jpeg;base64,${job.logo}` : 'https://via.placeholder.com/50'
  //           })).filter(job => !job.isHidden); // Show only visible jobs by default
  //       },
  //       (error) => console.error('Error loading job postings:', error)
  //   );
  // } 

  // loadJobPostings() {
  //   const batchYear = this.selectedBatchYear.trim() || undefined;
  //   this.jobService.getJobPostings(batchYear).subscribe(
  //       (data) => {
  //           this.jobPostings = data.map((job: any) => ({
  //               ...job,
  //               selected: false,
  //               logoUrl: job.logo ? `data:image/jpeg;base64,${job.logo}` : 'https://via.placeholder.com/50'
  //           })).filter(job => !job.isHidden);
  //       },
  //       (error) => console.error('Error loading job postings:', error)
  //   );
  // }

  loadJobPostings() {
    const batchYear = this.selectedBatchYear.trim() || undefined;
    this.jobService.getJobPostings(batchYear).subscribe(
      (data) => {
        this.jobPostings = data
          // .filter(job => !job.archiveYear) // Exclude archived jobs from main view
          .map((job: any) => ({
            ...job,
            selected: false,
            logoUrl: job.logo ? `data:image/jpeg;base64,${job.logo}` : 'https://via.placeholder.com/50'
          }))
          .filter(job => !job.isHidden || this.isRecruiterOrStaff); // Show hidden jobs to recruiters/staff
      },
      (error) => console.error('Error loading job postings:', error)
    );
  }





  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('jobPosting', new Blob([JSON.stringify(this.jobPosting)], { type: 'application/json' }));
  //   if (this.selectedFile) {
  //     formData.append('logo', this.selectedFile);
  //   }

  //   if (this.selectedJob) {
  //     this.jobService.updateJobPosting(this.jobPosting).subscribe(
  //       () => {
  //         this.loadJobPostings();
  //         this.resetForm();
  //         alert('Job updated successfully');
  //       },
  //       (error) => console.error('Error updating job:', error)
  //     );
  //   } else {
  //     this.jobService.createJobPosting(this.jobPosting).subscribe(
  //       () => {
  //         this.loadJobPostings();
  //         this.resetForm();
  //         alert('Job created successfully');
  //       },
  //       (error) => console.error('Error creating job:', error)
  //     );
  //   }
  // }

  onSubmit() {
    const formData = new FormData();
    formData.append('jobPosting', new Blob([JSON.stringify(this.jobPosting)], { type: 'application/json' }));
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    if (this.selectedJob) {
      this.jobService.updateJobPosting(this.selectedJob.id, formData).subscribe(
        () => {
          this.loadJobPostings();
          this.resetForm();
          alert('Job updated successfully');
        },
        (error) => console.error('Error updating job:', error)
      );
    } else {
      this.jobService.createJobPosting(formData).subscribe(
        () => {
          this.loadJobPostings();
          this.resetForm();
          alert('Job created successfully');
        },
        (error) => console.error('Error creating job:', error)
      );
    }
  }

  resetForm() {
    this.jobPosting = {
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
    this.selectedFile = null;
    this.logoPreview = null;
    this.selectedJob = null;
  }

  addSection() {
    this.jobPosting.additionalSections.push({ label: '', value: '' });
  }

  editJob(job: any) {
    const userEmail = this.jwtService.getUserDetails()?.email;
    if (job.createdBy === userEmail) {
      this.selectedJob = job;
      this.jobPosting = { ...job };
    }
  }

  deleteSelected() {
    const selectedJobs = this.jobPostings.filter((job) => job.selected);
    selectedJobs.forEach((job) =>
      this.jobService.deleteJobPosting(job.id).subscribe(
        () => this.loadJobPostings(),
        (error) => console.error('Error deleting job:', error)
      )
    );
  }

  sendToStaff() {
    const selectedJobs = this.jobPostings.filter((job) => job.selected);
    if (selectedJobs.length === 0) {
      alert('Please select at least one job posting to send to staff.');
      return;
    }
    selectedJobs.forEach((job) =>
      this.jobService.sendJobPostingToStaff(job.id).subscribe(
        () => {
          alert(`Job posting "${job.jobRole}" sent to staff for approval`);
          this.loadJobPostings(); // Refresh to show updated status
        },
        (error) => console.error('Error sending job to staff:', error)
      )
    );
  }

  reloadData() {
    this.loadJobPostings();
  }

  resetSize() {
    const div = this.resizableContainer.nativeElement;
    div.style.width = `${this.defaultWidth}px`;
    div.style.height = `${this.defaultHeight}px`;
  }

  toggleSelectAll(event: any) {
    this.jobPostings.forEach((job) => (job.selected = event.target.checked));
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

  viewApplicants(job: any) {
    console.log('Navigating to applicants for job ID:', job.id); // Debug
    this.router.navigate(['/job-applicants', job.id]);
  }

  hideJob(job: any) {
    if (confirm(`Hide job posting "${job.jobRole}" from students?`)) {
      this.jobService.hideJobPosting(job.id).subscribe(
        () => {
          job.isHidden = true;
          this.loadJobPostings();
        },
        error => console.error('Error hiding job:', error)
      );
    }
  }


  unhideJob(job: any) {
    if (confirm(`Unhide job posting "${job.jobRole}" for students?`)) {
      this.jobService.unhideJobPosting(job.id).subscribe(
        () => {
          job.isHidden = false;
          this.loadJobPostings();
        },
        error => console.error('Error unhiding job:', error)
      );
    }
  }


}