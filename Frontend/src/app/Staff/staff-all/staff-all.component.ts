import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar/sidebar.service';
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
    CommonModule,
    HeaderComponent,
    TasksComponent,
    SidebarComponent,
    CardsComponent,
    InterviewScheduleComponent,
    RecentActivityComponent,
  ],
  templateUrl: './staff-all.component.html',
  styleUrl: './staff-all.component.css'
})
// export class StaffAllComponent  implements OnInit{
//   title = 'Centurion University - Dashboard';
//   // selectedSidebarItem?: string;
//   selectedSidebarItem?: string;

//   // onSelectSidebarItem(item: string) {
//   //   this.selectedSidebarItem = item;
//   // }
//   constructor(private sidebarService: SidebarService) {}

//   ngOnInit() {
//     this.sidebarService.selectedItem$.subscribe(item => {
//       this.selectedSidebarItem = item;
//     });
//   }
export class StaffAllComponent implements OnInit {
  selectedItems: string[] = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });
  }
}
