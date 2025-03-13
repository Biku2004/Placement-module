import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-portal',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './job-portal.component.html',
  styleUrl: './job-portal.component.css'
})
export class JobPortalComponent {
  selectedJob: number | null = null;
  selectedSalary = '';
  selectedJobType = '';
  selectedBranch = '';

  salaryRanges = ['0-5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA'];
  jobTypes = ['Full-Time', 'Part-Time', 'Internship', 'Contract'];
  branches = ['CSE', 'IT', 'ECE', 'Design'];

  jobs = [
    {
      title: 'Software Engineer',
      company: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      type: 'Full-Time',
      salary: 1200000,
      location: 'Bangalore',
      branch: 'CSE',
      description: 'Develop and maintain cutting-edge software solutions.'
    },
    {
      title: 'Data Scientist',
      company: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      type: 'Part-Time',
      salary: 1500000,
      location: 'Hyderabad',
      branch: 'IT',
      description: 'Analyze large datasets to derive insights.'
    },
    {
      title: 'Product Manager',
      company: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      type: 'Full-Time',
      salary: 1800000,
      location: 'Delhi',
      branch: 'ECE',
      description: 'Oversee product development and delivery.'
    },
    {
      title: 'UX Designer',
      company: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_Icon.svg',
      type: 'Contract',
      salary: 1000000,
      location: 'Mumbai',
      branch: 'Design',
      description: 'Design engaging user interfaces and experiences.'
    },
    {
      title: 'AI Researcher',
      company: 'OpenAI',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
      type: 'Internship',
      salary: 800000,
      location: 'Pune',
      branch: 'CSE',
      description: 'Conduct research in Artificial Intelligence.'
    }
  ];

  // Filter jobs based on selected filters
  filteredJobs() {
    return this.jobs
      .filter(job =>
        (!this.selectedSalary || this.matchSalary(job.salary)) &&
        (!this.selectedJobType || job.type === this.selectedJobType) &&
        (!this.selectedBranch || job.branch === this.selectedBranch)
      );
  }

  // Salary filter logic
  matchSalary(salary: number) {
    const [min, max] = this.selectedSalary.split('-').map(Number);
    return salary >= min * 100000 && salary <= max * 100000;
  }

  // Sort Jobs by Salary
  sortJobsBySalary(order: string) {
    this.jobs.sort((a, b) => order === 'asc' ? a.salary - b.salary : b.salary - a.salary);
  }

  // Toggle Job Details
  toggleJobDetails(index: number) {
    this.selectedJob = this.selectedJob === index ? null : index;
  }
}