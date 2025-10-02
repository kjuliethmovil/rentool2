/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los proveedores usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ProviderI } from '../../../models/provider';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProviderService } from '../../../services/provider';

@Component({
  selector: 'app-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProviderGetall {
  providers: ProviderI[] = [];

  // Se inyecta el servicio y se suscribe al observable de proveedores
  constructor(private providerService: ProviderService) {
    this.providerService.providers$.subscribe(providers => {
      this.providers = providers;
    });
  }
}
