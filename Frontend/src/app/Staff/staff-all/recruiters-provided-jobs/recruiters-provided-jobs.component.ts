import { Component,OnInit } from '@angular/core';
import { JwtService } from '../../../service/jwt.service';
import { JobService } from '../create-jobs/job.service';
import { JobPostingService } from '../../../recruiter-all/job-posting/job-posting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-recruiters-provided-jobs',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './recruiters-provided-jobs.component.html',
  styleUrl: './recruiters-provided-jobs.component.css'
})
export class RecruiterProvidedComponent implements OnInit {
  companies: any[] = [];
  selectedCompany: any = null;
  selectedCompanyJobs: any[] = [];
  allJobs: any[] = [];

  constructor(private jobService: JobPostingService, private jwtService: JwtService) {}

  ngOnInit() {
    this.loadCompaniesAndJobs();
  }

  loadCompaniesAndJobs() {
    // Fetch all job postings
    this.jobService.getAllJobPostings().subscribe(
      (jobs) => {
        this.allJobs = jobs;

        // Group jobs by companyName to simulate companies
        const companyMap = new Map<string, any>();
        jobs.forEach((job) => {
          if (!companyMap.has(job.companyName)) {
            companyMap.set(job.companyName, {
              name: job.companyName,
              logo: `https://via.placeholder.com/150?text=${job.companyName}`, // Placeholder logo
              jobs: [],
            });
          }
          companyMap.get(job.companyName)!.jobs.push(job);
        });

        this.companies = Array.from(companyMap.values());
      },
      (error) => console.error('Error loading jobs:', error)
    );
  }

  selectCompany(company: any) {
    this.selectedCompany = company;
    this.selectedCompanyJobs = company.jobs;
  }

  approveJob(job: any) {
    this.jobService.approveJobPosting(job.id).subscribe(
      (updatedJob) => {
        job.status = updatedJob.status; // Update to "APPROVED"
        this.loadCompaniesAndJobs(); // Refresh data
        alert(`${job.jobRole} approved successfully`);
      },
      (error) => console.error('Error approving job:', error)
    );
  }

  rejectJob(job: any) {
    this.jobService.rejectJobPosting(job.id).subscribe(
      (updatedJob) => {
        job.status = updatedJob.status; // Update to "REJECTED"
        this.loadCompaniesAndJobs(); // Refresh data
        alert(`${job.jobRole} rejected successfully`);
      },
      (error) => console.error('Error rejecting job:', error)
    );
  }

  sendToStudents(job: any) {
    this.jobService.sendJobPostingToStudents(job.id).subscribe(
      (updatedJob) => {
        job.status = updatedJob.status; // Update to "SENT"
        this.loadCompaniesAndJobs(); // Refresh data
        alert(`${job.jobRole} sent to students successfully`);
      },
      (error) => console.error('Error sending job to students:', error)
    );
  }
}

