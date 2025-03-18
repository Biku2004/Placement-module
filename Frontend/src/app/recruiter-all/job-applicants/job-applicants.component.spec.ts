import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantsComponent } from './job-applicants.component';

describe('JobApplicantsComponent', () => {
  let component: JobApplicantsComponent;
  let fixture: ComponentFixture<JobApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApplicantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
