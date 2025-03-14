import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPortalComponent } from './job-portal.component';

describe('JobPortalComponent', () => {
  let component: JobPortalComponent;
  let fixture: ComponentFixture<JobPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobPortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
