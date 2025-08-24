import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTask(id: string): Observable<Task | undefined> {
  return this.http.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
    map((tasks: Task[]) => tasks.find((task: Task) => task.id === id))
  );
}

  addTask(task: Task): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tasks`, task);
  }


  updateTask(id: string, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/tasks/${id}`, task);
  }


  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }

  markTaskAsCompleted(id: string, task: Task): Observable<any> {
  const updatedTask = { ...task, completed: true };
  return this.http.put(`${this.apiUrl}/${id}`, updatedTask);
}

}


