import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Make environment apiUrl private for development and production
  private API_URL = environment.apiUrl;

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
