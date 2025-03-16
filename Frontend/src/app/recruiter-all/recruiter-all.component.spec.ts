import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAllComponent } from './recruiter-all.component';

describe('RecruiterAllComponent', () => {
  let component: RecruiterAllComponent;
  let fixture: ComponentFixture<RecruiterAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
