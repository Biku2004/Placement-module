import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CardsComponent } from './cards/cards.component';
import { InterviewScheduleComponent } from './interview-schedule/interview-schedule.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { TasksComponent } from './tasks/tasks.component'

@Component({
  selector: 'app-staff-all',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    CardsComponent,
    InterviewScheduleComponent,
    RecentActivityComponent,
    TasksComponent
  ],
  templateUrl: './staff-all.component.html',
  styleUrl: './staff-all.component.css'
})
export class StaffAllComponent {
  title = 'Centurion University - Dashboard';
}
