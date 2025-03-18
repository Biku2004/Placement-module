import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScheduledComponent } from './interview-scheduled.component';

describe('InterviewScheduledComponent', () => {
  let component: InterviewScheduledComponent;
  let fixture: ComponentFixture<InterviewScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewScheduledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
