// =====================================================
// Archivo: header.ts
// Autor: Karyn Movil
// Fecha: 2025-09-30
// Descripción: Componente del encabezado principal (Header)
// =====================================================

import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  // Variables para controlar la visibilidad de los modales
  showLogin = false;
  showHelp = false;
  showExit = false;

  // Métodos para abrir/cerrar los modales
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  toggleExit() {
    this.showExit = !this.showExit;
  }

}
