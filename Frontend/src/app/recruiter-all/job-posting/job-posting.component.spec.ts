import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingComponent } from './job-posting.component';

describe('JobPostingComponent', () => {
  let component: JobPostingComponent;
  let fixture: ComponentFixture<JobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPostingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
