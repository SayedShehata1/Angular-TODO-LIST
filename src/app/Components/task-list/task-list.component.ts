import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../Models/task';
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
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Get all tasks
    this.loadTasks();
  }

  // Load all tasks
  loadTasks() {
    this.isLoading = true;
    this.errorMessage = '';
    setTimeout(() => {
      this.taskService.getTasks().subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
          this.errorMessage = 'Failed to load tasks. Please try again later.';
          this.isLoading = false;
        }
      );
    }, 2000);
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
    this.taskService.createTask(newTask).subscribe(
      (task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      },
      (error) => {
        console.error('Error creating task:', error);
        this.errorMessage = 'Failed to create task. Please try again later.';
      }
    );
  }

  // Toggle completion
  toggleCompleted(task: Task) {
    this.taskService.toggleCompletion(task).subscribe(
      (updatedTask) => {
        this.tasks = this.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
      },
      (error) => {
        console.error('Error toggling completion:', error);
        this.errorMessage =
          'Failed to update task completion. Please try again later.';
      }
    );
  }

  // Delete a task
  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      (error) => {
        console.error('Error deleting task:', error);
        this.errorMessage = 'Failed to delete task. Please try again later.'; // Set error message for deletion
      }
    );
  }
}
