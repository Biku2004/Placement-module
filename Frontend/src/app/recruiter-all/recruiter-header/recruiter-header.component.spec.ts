import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHeaderComponent } from './recruiter-header.component';

describe('RecruiterHeaderComponent', () => {
  let component: RecruiterHeaderComponent;
  let fixture: ComponentFixture<RecruiterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
