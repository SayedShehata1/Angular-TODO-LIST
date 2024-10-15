import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../Models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  toggleCompletion(): void {
    this.toggle.emit(this.task);
  }
  deleteTask(): void {
    this.delete.emit(this.task.id);
  }
}
