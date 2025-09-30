import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Login data
  username = '';
  password = '';
  error = false;
  
  constructor(private auth: AuthService) {}

  onLogin() {
    this.error = !this.auth.login(this.username, this.password);
  }
}
