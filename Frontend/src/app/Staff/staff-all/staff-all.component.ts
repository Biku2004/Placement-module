import { Component, OnInit, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar/sidebar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CardsComponent } from './cards/cards.component';
import { InterviewScheduleComponent } from './interview-schedule/interview-schedule.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { TasksComponent } from './tasks/tasks.component'
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
// import { UserDetailsComponent } from '../staff-all/header/user-details.component';
// import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-staff-all',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TasksComponent,
    SidebarComponent,
    CardsComponent,
    InterviewScheduleComponent,
    RecentActivityComponent,
    CreateJobsComponent,
    // UserDetailsComponent
  ],
  templateUrl: './staff-all.component.html',
  styleUrl: './staff-all.component.css'
})

export class StaffAllComponent{
  selectedItems: string[] = [];
  currentDate: Date = new Date();
  // isSidebarOpen = false;
  // private sidebarTimeout: any;

  constructor(
    private sidebarService: SidebarService,
    // private authService: AuthService
  
  ) {}

  ngOnInit() {
    this.sidebarService.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });

    // this.authService.fetchUserDetails().subscribe(user => {
    //   this.authService.setUser(user);
    // });
  }

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent): void {
  //   if (event.clientX <= 10) { // Adjust the threshold as needed
  //     this.openSidebar();
  //   }
  // }

  // openSidebar(): void {
  //   this.isSidebarOpen = true;
  //   clearTimeout(this.sidebarTimeout);
  //   this.sidebarTimeout = setTimeout(() => {
  //     this.isSidebarOpen = false;
  //   }, 3000); // Sidebar will close after 3 seconds
  // }
}
