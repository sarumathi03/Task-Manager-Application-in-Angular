import { Component, computed, signal, effect } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks =signal<Task[]>([]);
  priorityFilter = signal('');
  dueDateFilter = signal('');
  filteredTasks = computed(() => {
    return this.tasks().filter(task =>{
      const Prioritymatch = this.priorityFilter() ? task.priority === this.priorityFilter() : true;
      const Datematch = this.dueDateFilter() ? task.dueDate === this.dueDateFilter() : true;
      return Prioritymatch && Datematch;
    });

  });

  constructor(private taskService: TaskService, private router: Router,private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.loadTasks();

    }
    loadTasks(): void{
      const currentuserId = localStorage.getItem('userId');
      this.taskService.getTasks().subscribe((data) => {
        //for login user check
        const usertask = data.filter(task => task.userId === currentuserId );
        this.tasks.set(usertask);
    });
  }
  markAsCompleted(task: Task): void {
  if (!task.completed) {
    this.taskService.markTaskAsCompleted(task.id, task).subscribe(() => {
      this.loadTasks(); 
    });
  }
}

  updatePriorityFilter(priority: string) {
    this.priorityFilter.set(priority)
  }

  updateDueDateFilter(date: string) {
       this.dueDateFilter.set(date)
  }

 deleteTask(id: string) {
  const confirmed = window.confirm('Are you sure you want to delete this task?');
  if (confirmed) {
    this.taskService.deleteTask(id).subscribe(() => {
      const updatedTasks = this.tasks().filter(task => task.id !== id);
      this.tasks.set(updatedTasks);

      this.snackBar.open('Task deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        verticalPosition: 'top'
      });
    });
  }
 }
}
