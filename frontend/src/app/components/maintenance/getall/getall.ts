/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar mantenimientos (Maintenance) usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MaintenanceI } from '../../../models/maintenance';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../../../services/maintenance';

@Component({
  selector: 'app-maintenance-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MaintenanceGetall {
  maintenances: MaintenanceI[] = [];

  constructor(private maintenanceService: MaintenanceService) {
    this.maintenanceService.maintenances$.subscribe(maintenances => {
      this.maintenances = maintenances;
    });
  }
}
