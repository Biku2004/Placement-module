import { Component,OnInit } from '@angular/core';
import { Job } from '../../student-profile/job';
import { Application } from '../../student-profile/application';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css'
})
export class ApplyJobComponent implements OnInit {
  job: Job | null = null;
  application: Application = {
    jobPostId: 0,
    name: '',
    address: '',
    college: '',
    branch: '',
    course: '',
    photo: null,
    resume: null,
    cgpa: 0,
    skills: [],
    contact: '',
    email: '',
    achievements: ''
  };

  // Skills for dropdown
  allSkills: string[] = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Machine Learning', 'Data Analysis', 'UI/UX', 'Project Management', 'Communication'
  ];
  filteredSkills: string[] = [...this.allSkills];
  skillSearch: string = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.studentService.getJobById(+jobId).subscribe(job => {
        this.job = job;
        this.application.jobPostId = job.id;
      });
    }
  }

  filterSkills() {
    this.filteredSkills = this.allSkills.filter(skill =>
      skill.toLowerCase().includes(this.skillSearch.toLowerCase())
    );
  }

  toggleSkill(skill: string) {
    const index = this.application.skills.indexOf(skill);
    if (index === -1) {
      this.application.skills.push(skill);
    } else {
      this.application.skills.splice(index, 1);
    }
  }

  onPhotoUpload(event: any) {
    this.application.photo = event.target.files[0];
  }

  onResumeUpload(event: any) {
    this.application.resume = event.target.files[0];
  }

  onSubmit() {
    if (!this.application.resume) {
      alert('Please upload your resume.');
      return;
    }
    this.studentService.submitApplication(this.application).subscribe(response => {
      alert('Application submitted successfully!');
      // Optionally redirect to dashboard or clear form
    });
  }
}