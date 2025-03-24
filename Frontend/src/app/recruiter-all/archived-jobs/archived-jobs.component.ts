// import { Component,OnInit } from '@angular/core';
// import { JobPostingService } from '../job-posting/job-posting.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-archived-jobs',
//   standalone: true,
//   imports: [FormsModule,CommonModule],
//   templateUrl: './archived-jobs.component.html',
//   styleUrl: './archived-jobs.component.css'
// })
// export class ArchivedJobsComponent implements OnInit {
//   archiveYears: string[] = [];
//   selectedYear: string = '';
//   archivedJobs: any[] = [];

//   // jobPosting: any = {
//   //   companyName: '',
//   //   website: '',
//   //   companyProfile: '',
//   //   eligibleCourses: '',
//   //   batchYear: '',
//   //   jobRole: '',
//   //   jobLocation: '',
//   //   annualCTC: '',
//   //   rolesResponsibilities: '',
//   //   skillsQualifications: '',
//   //   selectionProcess: '',
//   //   registrationProcess: '',
//   //   lastDateToRegister: '',
//   //   benefitsIncentives: '',
//   //   roleDetails: '',
//   //   expectedSkillsTools: '',
//   //   additionalSections: [],
//   // };


//   constructor(private jobPostingService: JobPostingService) {}

//   ngOnInit() {
//     this.loadBatchYears();
//   }


//   loadBatchYears() {
//     this.jobPostingService.getBatchYears().subscribe(
//       years => {
//         this.archiveYears = years.filter(year => year.startsWith('archive_year')); // Filter for archived years
//         this.selectedYear = this.archiveYears[0] || '';
//         if (this.selectedYear) this.loadArchivedJobs();
//       },
//       error => console.error('Error loading batch years:', error)
//     );
//   }

//   //   loadBatchYears() {
//   //   this.jobService.getBatchYears().subscribe(
//   //       years => {
//   //           console.log('Batch years received:', years);
//   //           this.batchYears = years;
//   //       },
//   //       error => console.error('Error loading batch years:', error)
//   //   );
//   // }

//   loadArchivedJobs() {
//     this.jobPostingService.getArchivedJobPostings(this.selectedYear).subscribe(
//       (jobs) => {
//         this.archivedJobs = jobs.map(job => ({
//           ...job,
//           logoUrl: job.logo ? `data:image/jpeg;base64,${job.logo}` : 'https://via.placeholder.com/50'
//         }));
//       },
//       (error) => console.error('Error loading archived jobs:', error)
//     );
//   }

//   onYearChange() {
//     this.loadArchivedJobs();
//   }

//   unhideJob(job: any) {
//     if (confirm(`Unhide job posting "${job.jobRole}" for students?`)) {
//       this.jobPostingService.unhideJobPosting(job.id).subscribe(
//         () => {
//           job.isHidden = false;
//           this.loadArchivedJobs();
//         },
//         error => console.error('Error unhiding job:', error)
//       );
//     }
//   }

//   unarchiveJob(job: any) {
//     if (confirm(`Unarchive job posting "${job.jobRole}"?`)) {
//       this.jobPostingService.unarchiveJobPosting(job.id).subscribe(
//         () => {
//           job.archiveYear = null;
//           this.loadArchivedJobs();
//         },
//         error => console.error('Error unarchiving job:', error)
//       );
//     }
//   }
// }