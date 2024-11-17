import { Component,OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})

export class CreateCompanyComponent implements OnInit {
  company: any = {
    name: '',
    logoUrl: '',
    industry: '',
    location: '',
    website: '',
    description: '',
    companyType: '',
    companySize: '',
    establishedYear: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    secondaryContactName: '',
    secondaryContactEmail: '',
    secondaryContactPhone: ''
  };
  companies: any[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    }, error => {
      console.error('Error loading companies:', error);
    });
  }

  onSubmit(): void {
    this.companyService.createCompany(this.company).subscribe(() => {
      this.loadCompanies(); // Reload companies after creating a new one
      this.resetForm(); // Reset the form
    }, error => {
      console.error('Error creating company:', error);
    });
  }

  resetForm(): void {
    this.company = {
      name: '',
      logoUrl: '',
      industry: '',
      location: '',
      website: '',
      description: '',
      companyType: '',
      companySize: '',
      establishedYear: null,
      primaryContactName: '',
      primaryContactEmail: '',
      primaryContactPhone: '',
      secondaryContactName: '',
      secondaryContactEmail: '',
      secondaryContactPhone: ''
    };
  }
}