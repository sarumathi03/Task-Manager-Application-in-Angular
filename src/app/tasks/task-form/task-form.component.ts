import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
   taskForm: FormGroup = new FormGroup({});
   isEditMode: boolean = false;

   constructor(private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private snackBar: MatSnackBar
    
   ){}

   
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      reminder: [false]
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("Edit Id:" ,id);
    if (id) {
      this.isEditMode = true;
      this.taskService.getTask(id).subscribe(task => {
        //console.log("Fetched task", task);
        if (task) {
          this.taskForm.patchValue(task);
        }
      });
    }
  }
  onReminderChange(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.snackBar.open('Reminder added successfully!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      const userId = localStorage.getItem('userId');
      task.userId = userId ?? '';
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditMode && id) {
     
        this.taskService.updateTask(id, task).subscribe(() => {
          console.log('Task updated successfully');
          this.snackBar.open('Task updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

          this.router.navigate(['/home/tasklist']);
        });
      } else {
       
        this.taskService.addTask(task).subscribe(() => {
          console.log('New task created');
           this.snackBar.open('Task created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
           });
          this.router.navigate(['/home/tasklist']);
        });
      }

    }
}
}
