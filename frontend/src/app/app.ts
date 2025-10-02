// =====================================================
// Archivo: app.ts
// Autor: Karyn Movil
// Fecha: 2025-09-30
// Descripción: Componente raíz que importa Header, Footer y Aside
// =====================================================
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Aside } from './components/layout/aside/aside';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Aside],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
