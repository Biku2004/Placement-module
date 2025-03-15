import { Component,OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-dashboard.component.html',
  styleUrl: './progress-dashboard.component.css'
})
export class ProgressDashboardComponent implements OnInit {
  progress: any = { applications: 0, interviews: 0, offers: 0, feedback: [] };

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getProgress().subscribe(progress => {
      this.progress = progress;
    });
  }
}