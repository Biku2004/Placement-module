import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecruiterProvidedComponent } from './recruiters-provided-jobs.component';

describe('RecruiterProvidedComponent', () => {
  let component: RecruiterProvidedComponent;
  let fixture: ComponentFixture<RecruiterProvidedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterProvidedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
