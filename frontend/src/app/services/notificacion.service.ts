import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private toasts: any[] = [];

  show(type: 'success' | 'error' | 'info', mensaje: string, titulo?: string) {
    this.toasts.push({ type, mensaje, titulo });
  }

  getToasts() {
    return this.toasts;
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
