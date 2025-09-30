import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificacionService } from '../../services/notificacion.service';

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
  isLoading = false;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private notificacionService: NotificacionService
  ) {}

  onRegister() {
    // Limpiar errores previos
    this.registerError = '';
    this.isLoading = true;

    // Validar que todos los campos estén completos
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      this.registerError = 'Todos los campos son obligatorios';
      this.isLoading = false;
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email)) {
      this.registerError = 'Por favor ingresa un email válido';
      this.isLoading = false;
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerError = 'Las contraseñas no coinciden';
      this.isLoading = false;
      return;
    }

    // Validar longitud de contraseña
    if (this.registerData.password.length < 6) {
      this.registerError = 'La contraseña debe tener al menos 6 caracteres';
      this.isLoading = false;
      return;
    }

    // Intentar registrar el usuario
    setTimeout(() => {
      const success = this.auth.register(
        this.registerData.name,
        this.registerData.email,
        this.registerData.password
      );

      this.isLoading = false;

      if (success) {
        this.notificacionService.show('success', '¡Cuenta creada exitosamente! Bienvenido a CodeLearn');
        // El servicio ya redirige automáticamente al dashboard
      } else {
        this.registerError = 'El email ya está registrado. Por favor usa otro email o inicia sesión.';
      }
    }, 1500);
  }
}
