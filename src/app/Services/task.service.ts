import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Models/Task';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL);
  }

  // Create new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task);
  }

  // Toggle Task Completion
  toggleCompletion(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
  }

  // Delete a task
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
