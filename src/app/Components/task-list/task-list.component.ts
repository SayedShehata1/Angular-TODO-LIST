import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../Models/Task';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Get all tasks
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Add a new task
  addTask(e: Event) {
    e.preventDefault();
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = {
      title: this.newTaskTitle,
      completed: false,
      id:
        this.tasks.length > 0
          ? `${Math.max(...this.tasks.map((t) => +t.id)) + 1}`
          : '1',
    };
    this.taskService.createTask(newTask).subscribe((task) => {
      this.tasks.push(task);
      this.newTaskTitle = '';
    });
  }

  // Toggle completion
  toggleCompleted(task: Task) {
    this.taskService.toggleCompletion(task).subscribe((updatedTask) => {
      this.tasks = this.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
    });
  }

  // Delete a task
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
