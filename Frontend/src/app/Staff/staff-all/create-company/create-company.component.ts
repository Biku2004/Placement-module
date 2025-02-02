import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('resizableContainer') resizableContainer!: ElementRef;
  private defaultWidth = 800;
  private defaultHeight = 400;

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

  deleteSelected(): void {
    const selectedCompanies = this.companies.filter(company => company.selected);
    selectedCompanies.forEach(company => {
      this.companyService.deleteCompany(company.id).subscribe(() => {
        this.loadCompanies(); // Reload companies after deletion
      }, error => {
        console.error('Error deleting company:', error);
      });
    });
  }

  reloadData(): void {
    this.loadCompanies();
  }

  resetSize(): void {
    const div = this.resizableContainer.nativeElement;
    div.style.width = `${this.defaultWidth}px`;
    div.style.height = `${this.defaultHeight}px`;
  }

  ngAfterViewInit(): void {
    this.makeResizableDiv(this.resizableContainer.nativeElement);
  }

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.companies.forEach(company => company.selected = checked);
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


}