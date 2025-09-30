import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario = { nombre: '', email: '' };
  editing = false;
  private modalRef?: NgbModalRef;

  constructor(
    private usuarioService: UsuarioService,
    private notificacionService: NotificacionService,
    private modalService: NgbModal,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: () => this.notificacionService.show('error', 'Error al cargar usuarios')
    });
  }

  saveUsuario(): void {
    if (this.editing) {
      this.usuarioService.updateUsuario(this.usuario.id!, this.usuario).subscribe({
        next: () => {
          this.notificacionService.show('success', 'Usuario actualizado correctamente');
          this.resetForm();
          this.loadUsuarios();
        },
        error: () => this.notificacionService.show('error', 'Error al actualizar usuario')
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: () => {
          this.notificacionService.show('success', 'Usuario creado con éxito');
          this.resetForm();
          this.loadUsuarios();
        },
        error: () => this.notificacionService.show('error', 'Error al crear usuario')
      });
    }
  }

  editUsuario(usuario: Usuario): void {
    this.usuario = { ...usuario };
    this.editing = true;
  }

  openConfirmDelete(content: any, usuario: Usuario): void {
    this.usuario = { ...usuario };
    this.modalRef = this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  deleteUsuario(): void {
    this.modalRef?.close();
    this.usuarioService.deleteUsuario(this.usuario.id!).subscribe({
      next: () => {
        this.notificacionService.show('success', 'Usuario eliminado');
        this.loadUsuarios();
      },
      error: () => this.notificacionService.show('error', 'Error al eliminar usuario')
    });
  }

  resetForm(): void {
    this.usuario = { nombre: '', email: '' };
    this.editing = false;
  }
}
