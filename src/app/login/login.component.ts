import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe(users => {
      const user = users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem('userId', user.id);
        console.log("user found");
        this.snackBar.open('Logged in successfully!', 'Close',{duration: 3000});
        this.router.navigate(['/home/tasklist']); 
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}

