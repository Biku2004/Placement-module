import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterEditProfileComponent } from './recruiter-edit-profile.component';

describe('RecruiterEditProfileComponent', () => {
  let component: RecruiterEditProfileComponent;
  let fixture: ComponentFixture<RecruiterEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterEditProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
