import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditProfileComponent } from './staff-edit-profile.component';

describe('StaffEditProfileComponent', () => {
  let component: StaffEditProfileComponent;
  let fixture: ComponentFixture<StaffEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEditProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
