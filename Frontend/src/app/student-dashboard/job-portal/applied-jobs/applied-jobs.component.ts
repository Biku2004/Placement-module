import { Component, OnInit } from '@angular/core';
import { AppliedJob } from '../../student-profile/applied-job';
import { StudentService } from '../../student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent implements OnInit {
  appliedJobs: AppliedJob[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getAppliedJobs().subscribe(jobs => {
      this.appliedJobs = jobs;
    });
  }

  // Dynamic class for overall job status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Submitted':
        return 'bg-yellow-100 text-yellow-700';
      case 'Viva Round':
      case 'Assessment Round':
        return 'bg-blue-100 text-blue-700';
      case 'Offer Received':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  // Dynamic class for round status
  getRoundStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-gray-200 text-gray-700';
      case 'Opened':
        return 'bg-blue-200 text-blue-700';
      case 'Completed':
        return 'bg-green-200 text-green-700';
      case 'Failed':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }
}