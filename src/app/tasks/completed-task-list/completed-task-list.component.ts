import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-completed-task-list',
  templateUrl: './completed-task-list.component.html',
  styleUrl: './completed-task-list.component.css'
})
export class CompletedTaskListComponent implements OnInit {
   completedTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const userId =localStorage.getItem('userId');
    
    this.taskService.getTasks().subscribe(tasks => {
      const completedtask =tasks.filter(task => task.completed && task.userId === userId)
      this.completedTasks = completedtask;
    });
  }
}



