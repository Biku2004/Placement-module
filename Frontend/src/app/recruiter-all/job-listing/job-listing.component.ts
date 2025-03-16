import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecruiterService } from '../recruiter.service';
import { JwtService } from '../../service/jwt.service';
// import { RecruiterService } from '../recruiter.service';

@Component({
  selector: 'app-job-listing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './job-listing.component.html',
  styleUrl: './job-listing.component.css'
})
export class JobListComponent implements AfterViewInit {
  jobs: any[] = [];
  @ViewChild('resizableContainer') resizableContainer!: ElementRef;

  constructor(private recruiterService: RecruiterService, private jwtService: JwtService) {
    this.loadJobs();
  }

  loadJobs() {
    const recruiterId = this.jwtService.getUserDetails()?.email || '';
    this.recruiterService.getJobs(recruiterId).subscribe(
      (data) => (this.jobs = data.map((job: any) => ({ ...job, selected: false }))),
      (error) => console.error('Error loading jobs:', error)
    );
  }

  deleteSelected() {
    const selectedJobs = this.jobs.filter((job) => job.selected);
    selectedJobs.forEach((job) =>
      this.recruiterService.deleteJob(job.id).subscribe(() => this.loadJobs())
    );
  }

  reloadData() {
    this.loadJobs();
  }

  toggleSelectAll(event: any) {
    this.jobs.forEach((job) => (job.selected = event.target.checked));
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