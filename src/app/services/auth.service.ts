import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) {}

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}