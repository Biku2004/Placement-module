import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedJobsComponent } from './archived-jobs.component';

describe('ArchivedJobsComponent', () => {
  let component: ArchivedJobsComponent;
  let fixture: ComponentFixture<ArchivedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
