// import { Component  , OnInit} from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobService } from './job.service';
import { CommonModule } from '@angular/common';
import { JobModalComponent } from './job-modal/job-modal.component';
interface AdditionalSection {
  label: string;
  value: string;
}
@Component({
  selector: 'app-create-jobs',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JobModalComponent
  ],
  templateUrl: './create-jobs.component.html',
  styleUrl: './create-jobs.component.css'
})
export class CreateJobsComponent implements OnInit{
  jobPost = {
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
    additionalSections: [] as AdditionalSection[]
    // additionalSections: {} as { [key: string]: string }
    // additionalSections:[] as [] as AdditionalSection[]
  };
  jobPosts: any[] = [];
  selectedJob: any = null;
  additionalSectionHeaders: string[] = [];
  @ViewChild('resizableContainer') resizableContainer!: ElementRef;
  private defaultWidth = 800;
  private defaultHeight = 400;

  constructor(
    private http: HttpClient,
    private jobService: JobService,
  ) {}

  


  ngAfterViewInit(): void {
    this.makeResizableDiv(this.resizableContainer.nativeElement);
  }

  // onSubmit() {
  //   this.http.post('http://localhost:8080/api/jobs', this.jobPosts)
  //     .subscribe(response => {
  //       console.log('Job post created:', response);
  //     }, error => {
  //       console.error('Error creating job post:', error);
  //     });
  // }

  onSubmit(): void {
    this.jobService.createJobPost(this.jobPost).subscribe(
      response => {
        console.log('Job post created:', response);
        this.loadJobPosts(); // Reload job posts after creating a new one
        this.jobPost = {
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
          // additionalSections: {} as { [key: string]: string }
          additionalSections: [] as AdditionalSection[]
          // additionalSections: [] as AdditionalSection[]
        }; // Reset the form
      },
      error => {
        console.error('Error creating job post:', error);
      }
    );
  }

  addSection(): void {
    this.jobPost.additionalSections.push({ label: 'New Section', value: '' });
  }
  // addSection(): void {
  //   const newSectionLabel = `New Section ${Object.keys(this.jobPost.additionalSections).length + 1}`;
  //   this.jobPost.additionalSections[newSectionLabel] = '';
  //   this.updateAdditionalSectionHeaders();
  // }

  updateAdditionalSectionHeaders(): void {
    this.additionalSectionHeaders = Object.keys(this.jobPost.additionalSections);
  }

  ngOnInit(): void {
    this.loadJobPosts();
  }

  loadJobPosts(): void {
    this.jobService.getJobPosts().subscribe(data => {
      this.jobPosts = data;
    });
  }

  reloadData(): void {
    this.loadJobPosts();
  }

  resetSize(): void {
    const div = this.resizableContainer.nativeElement;
    div.style.width = `${this.defaultWidth}px`;
    div.style.height = `${this.defaultHeight}px`;
  }

  makeResizableDiv(div: HTMLElement): void {
    const resizers = div.querySelectorAll('.resizer');
    let originalWidth = 0;
    let originalHeight = 0;
    let originalMouseX = 0;
    let originalMouseY = 0;

    resizers.forEach(resizer => {
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
          }
           else if (resizer.classList.contains('right')) {
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

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.jobPosts.forEach(job => job.selected = isChecked);
  }

  deleteSelected(): void {
    const selectedJobs = this.jobPosts.filter(job => job.selected);
    selectedJobs.forEach(job => {
      this.jobService.deleteJobPost(job.id).subscribe(() => {
        this.loadJobPosts();
      }, error => {
        console.error('Error deleting job post:', error);
      });
    });
  }

  sendToStudents(): void {
    const selectedJobs = this.jobPosts.filter(job => job.selected);
    selectedJobs.forEach(job => {
      this.jobService.sendJobPostToStudents(job.id).subscribe(() => {
        console.log('Job post sent to students:', job.id);
      }, error => {
        console.error('Error sending job post to students:', error);
      });
    });
  }

  openModal(job: any): void {
    this.selectedJob = { ...job };
  }

  closeModal(): void {
    this.selectedJob = null;
    this.loadJobPosts(); // Reload job posts to reflect any changes
  }


}