import { Component, OnInit } from '@angular/core';
import { RecruiterService } from './recruiter.service';
import { CompanyService } from '../Staff/staff-all/create-company/company.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.css'
})

export class RecruiterComponent implements OnInit {
  recruiter: any = {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    companyId: null
  };
  recruiters: any[] = [];
  companies: any[] = [];

  constructor(
    private recruiterService: RecruiterService, 
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadRecruiters();
    this.loadCompanies();
  }

  loadRecruiters(): void {
    this.recruiterService.getRecruiters().subscribe(data => {
      this.recruiters = data;
    }, error => {
      console.error('Error loading recruiters:', error);
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => {
      console.error('Error loading companies:', error);
    });
  }

  onSubmit(): void {
    this.recruiterService.createRecruiter(this.recruiter).subscribe(() => {
      this.loadRecruiters(); // Reload recruiters after creating a new one
      this.resetForm(); // Reset the form
    }, error => {
      console.error('Error creating recruiter:', error);
    });
  }

  resetForm(): void {
    this.recruiter = {
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      companyId: null
    };
  }
}