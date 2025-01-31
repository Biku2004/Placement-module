import { Component , OnInit} from '@angular/core';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-creator',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task-creator.component.html',
  styleUrl: './task-creator.component.css'
})
export class TaskCreatorComponent implements OnInit {
  task: any = {
    name: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    dueTime: ''
  };
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

  onSubmit(): void {
    this.taskService.createTask(this.task).subscribe(() => {
      this.loadTasks(); // Reload tasks after creating a new one
      this.resetForm(); // Reset the form
    }, error => {
      console.error('Error creating task:', error);
    });
  }

  resetForm(): void {
    this.task = {
      name: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      dueTime: ''
    };
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks(); // Reload tasks after deletion
    }, error => {
      console.error('Error deleting task:', error);
    });
  }

  toggleTaskCompletion(task: any): void {
    this.taskService.getTaskById(task.id).subscribe(dbTask => {
      task.completed = dbTask.completed; // Update the local task object with the status from the database
    }, error => {
      console.error('Error fetching task:', error);
    });
  }

  isOverdue(task: any): boolean {
    const dueDateTime = new Date(task.dueDate + 'T' + task.dueTime);
    return dueDateTime < new Date();
  }

  getTimeOverview(task: any): string {
    const dueDateTime = new Date(task.dueDate + 'T' + task.dueTime);
    const now = new Date();
    const diff = dueDateTime.getTime() - now.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  }
}