import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScheduleComponent } from './interview-schedule.component';

describe('InterviewScheduleComponent', () => {
  let component: InterviewScheduleComponent;
  let fixture: ComponentFixture<InterviewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
