import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
}