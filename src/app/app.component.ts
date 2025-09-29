import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// ✅ Importa NgbToastModule (para los toasts)
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

// Para el *ngFor en el toast
import { CommonModule } from '@angular/common';

// Servicio de notificaciones
import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // ✅ Componentes
    NavbarComponent,
    FooterComponent,
    RouterOutlet,

    // ✅ Módulos necesarios
    NgbToastModule,   // ← Para <ngb-toast> y <ngb-toast-header>
    CommonModule      // ← Para *ngFor, *ngIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public notificaciones: NotificacionService) {}

  toastClasses(toast: any) {
    return {
      'bg-success text-white': toast.type === 'success',
      'bg-danger text-white': toast.type === 'error',
      'bg-info text-white': toast.type === 'info'
    };
  }
}
