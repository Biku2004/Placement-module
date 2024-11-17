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
}