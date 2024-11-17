import { Component ,OnInit } from '@angular/core';
import { TaskService } from './task-creator/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    }, error => {
      console.error('Error loading tasks:', error);
    });
  }
  reloadTasks(): void {
    this.loadTasks();
  }
}