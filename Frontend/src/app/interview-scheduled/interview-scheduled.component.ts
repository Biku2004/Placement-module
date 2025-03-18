import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  standalone: true,
  selector: 'app-interview-scheduled',
  imports: [CommonModule, FullCalendarModule], // ✅ Import FullCalendarModule here
  templateUrl: './interview-scheduled.component.html',
  styleUrls: ['./interview-scheduled.component.css']
})
export class InterviewScheduledComponent {
  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendarOptions: any = {
    plugins: this.calendarPlugins,
    initialView: 'dayGridMonth',
    events: [
      { title: 'Interview at XYZ Ltd', date: '2025-03-22' }
    ]
  };
}
