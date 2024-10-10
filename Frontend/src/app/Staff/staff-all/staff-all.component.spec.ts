import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAllComponent } from './staff-all.component';

describe('StaffAllComponent', () => {
  let component: StaffAllComponent;
  let fixture: ComponentFixture<StaffAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
