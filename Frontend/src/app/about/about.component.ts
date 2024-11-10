import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

    collegeName = 'Example College';
    missionStatement = 'To empower our students with the skills and opportunities they need to launch successful careers.';
    statistics = [
      { label: 'Students Placed', value: '500+' },
      { label: 'Partner Companies', value: '100+' },
      { label: 'Average Package', value: '₹8 LPA' },
      { label: 'Highest Package', value: '₹25 LPA' }
    ];
    teamMembers = [
      { name: 'Dr. Jane Doe', position: 'Head of Placement Cell' },
      { name: 'Mr. John Smith', position: 'Corporate Relations Officer' },
      { name: 'Ms. Emily Brown', position: 'Student Coordinator' }
    ];
}
