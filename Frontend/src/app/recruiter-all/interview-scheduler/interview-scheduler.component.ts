import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecruiterService } from '../recruiter.service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-interview-scheduler',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './interview-scheduler.component.html',
  styleUrl: './interview-scheduler.component.css'
})
export class InterviewSchedulerComponent {
  interview = { title: '', dateTime: '', type: '' };

  constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {}

  onSchedule() {
    const recruiterId = this.jwtService.getUserDetails()?.email || '';
    this.recruiterService.scheduleInterview(this.interview, recruiterId).subscribe(
      () => {
        this.resetForm();
        alert('Interview scheduled');
      },
      (error) => console.error('Error scheduling:', error)
    );
  }

  resetForm() {
    this.interview = { title: '', dateTime: '', type: '' };
  }
}