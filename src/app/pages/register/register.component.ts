import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Register data
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  registerError = '';
  
  constructor(private auth: AuthService) {}

  onRegister() {
    // Validar que las contraseñas coincidan
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerError = 'Las contraseñas no coinciden';
      return;
    }

    // Validar que todos los campos estén completos
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      this.registerError = 'Todos los campos son obligatorios';
      return;
    }

    // Aquí se implementaría la lógica de registro
    // Por ahora simulamos un registro exitoso
    this.registerError = '';
    console.log('Registro exitoso:', this.registerData);
    // Redirigir al dashboard o mostrar mensaje de éxito
  }
}
