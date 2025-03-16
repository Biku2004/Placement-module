import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecruiterService } from '../recruiter.service';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.css'
})
export class StudentSearchComponent {
  filters = { branch: '', minCgpa: null, skills: '', year: null };
  students: any[] = [];

  constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {}

  onSearch() {
    this.recruiterService.searchStudents(this.filters).subscribe(
      (data) => (this.students = data),
      (error) => console.error('Error searching students:', error)
    );
  }

  shortlist(studentId: number) {
    const recruiterId = this.jwtService.getUserDetails()?.email || '';
    this.recruiterService.shortlistStudent(studentId, recruiterId).subscribe(
      () => alert('Student shortlisted'),
      (error) => console.error('Error shortlisting:', error)
    );
  }
}
