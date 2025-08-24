import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private router: Router,
    private snackBar: MatSnackBar
  ) {}

  logout() {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('userId');
      this.snackBar.open('Logged out successfully!','Close',{
        duration:3000,
        panelClass:['snackbar-success'],
        verticalPosition:'top'

      }
);
      this.router.navigate(['/login']);
    }
  }
}


