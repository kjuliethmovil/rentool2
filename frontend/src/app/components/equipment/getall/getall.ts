/**
 * Archivo: getall.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los equipos usando PrimeNG Table y TailwindCSS.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { EquipmentI } from '../../../models/equipment';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { EquipmentService } from '../../../services/equipment';

@Component({
  selector: 'app-equipment-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EquipmentGetall {
  equipments: EquipmentI[] = [];

  constructor(private equipmentService: EquipmentService) {
    this.equipmentService.equipments$.subscribe(equipments => {
      this.equipments = equipments;
    });
  }
}
