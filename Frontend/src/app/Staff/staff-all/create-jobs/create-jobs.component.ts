// import { Component  , OnInit} from '@angular/core';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobService } from './job.service';
import { CommonModule } from '@angular/common';
import { JobModalComponent } from './job-modal/job-modal.component';
import { Company } from './models/company';
import { JobPost } from './models/job-post';
// import { CompanyService } from '../create-company/company.service';
import { CompanyDropService } from './companyDrop.service';
import { Router } from '@angular/router';

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
  companies: Company[] = [];
  selectedJob: any = null;
  additionalSectionHeaders: string[] = [];
  selectedFile: File | null = null;
  logoPreview: string | null = null;

  @ViewChild('resizableContainer') resizableContainer!: ElementRef;
  private defaultWidth = 800;
  private defaultHeight = 400;

  constructor(
    private http: HttpClient,
    private jobService: JobService,
    private companyService: CompanyDropService,
    private router: Router
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

  // onSubmit(): void {
  //   this.jobService.createJobPost(this.jobPost).subscribe(
  //     response => {
  //       console.log('Job post created:', response);
  //       this.loadJobPosts(); // Reload job posts after creating a new one
  //       this.resetForm();
  //       this.jobPost = {
  //         companyName: '',
  //         website: '',
  //         companyProfile: '',
  //         eligibleCourses: '',
  //         batchYear: '',
  //         jobRole: '',
  //         jobLocation: '',
  //         annualCTC: '',
  //         rolesResponsibilities: '',
  //         skillsQualifications: '',
  //         selectionProcess: '',
  //         registrationProcess: '',
  //         lastDateToRegister: '',
  //         benefitsIncentives: '',
  //         roleDetails: '',
  //         expectedSkillsTools: '',
  //         additionalSections: [] as AdditionalSection[]
  //       }; 
  //     },
  //     error => {
  //       console.error('Error creating job post:', error);
  //     }
  //   );
  // }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('jobPost', new Blob([JSON.stringify(this.jobPost)], { type: 'application/json' }));
    if (this.selectedFile) {
        formData.append('logo', this.selectedFile);
    }

    this.jobService.createJobPost(formData).subscribe(
        response => {
            console.log('Job post created:', response);
            this.loadJobPosts();
            this.resetForm();
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
    this.loadCompanies(); // Fetch companies on init
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  onCompanySelect(event: Event): void {
    const selectedCompanyName = (event.target as HTMLSelectElement).value;
    const selectedCompany = this.companies.find(company => company.name === selectedCompanyName);
    if (selectedCompany) {
      // Optionally prefill related fields
      this.jobPost.website = selectedCompany.website || '';
      this.jobPost.companyProfile = selectedCompany.description || '';
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // loadJobPosts(): void {
  //   this.jobService.getJobPosts().subscribe(data => {
  //     this.jobPosts = data;
  //   });
  // }

  loadJobPosts(): void {
    this.jobService.getJobPosts().subscribe(data => {
        this.jobPosts = data.map(job => ({
            ...job,
            selected: false,
            logoUrl: job.logo ? `data:image/jpeg;base64,${job.logo}` : 'https://via.placeholder.com/50'
        }));
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
        alert('Job post sent to students:');
      }, error => {
        console.error('Error sending job post to students:', error);
      });
    });
  }

  viewApplications(): void {
    const selectedJobs = this.jobPosts.filter(job => job.selected);
    if (selectedJobs.length === 1) {
        this.router.navigate(['/staff-job-applicants', selectedJobs[0].id]);
    } else {
        alert('Please select exactly one job to view applications.');
    }
  }

  openModal(job: any): void {
    this.selectedJob = { ...job };
  }

  closeModal(): void {
    this.selectedJob = null;
    this.loadJobPosts(); // Reload job posts to reflect any changes
  }


  resetForm(): void {
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
      additionalSections: []
    };
    this.selectedFile = null;
    this.logoPreview = null;
  }


}