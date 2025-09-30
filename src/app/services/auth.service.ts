import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  private currentUser: User | null = null;
  private users: User[] = [
    { id: '1', name: 'Admin', email: 'admin@codelearn.com', password: '1234' }
  ];

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    // Verificar si el usuario ya existe
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password
    };

    this.users.push(newUser);
    this.loggedIn = true;
    this.currentUser = newUser;
    return true;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserName(): string {
    return this.currentUser?.name || 'Usuario';
  }
}