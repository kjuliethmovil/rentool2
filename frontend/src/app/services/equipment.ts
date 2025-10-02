/**
 * Archivo: equipment.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar equipos (EquipmentI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EquipmentI } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equipmentsService = new BehaviorSubject<EquipmentI[]>([
    {
      equipment_id: 1,
      category_id: 1,
      provider_id: 1,
      name: 'Taladro eléctrico',
      description: 'Taladro percutor de 500W',
      status: 'AVAILABLE',
      daily_rate: 25.0
    },
    {
      equipment_id: 2,
      category_id: 2,
      provider_id: 2,
      name: 'Martillo',
      description: 'Martillo de carpintero',
      status: 'AVAILABLE',
      daily_rate: 5.0
    }
  ]);

  equipments$ = this.equipmentsService.asObservable();

  getEquipments() {
    return this.equipmentsService.value;
  }

  addEquipment(equipment: EquipmentI) {
    const equipments = this.equipmentsService.value;
    equipment.equipment_id = equipments.length
      ? Math.max(...equipments.map(e => e.equipment_id ?? 0)) + 1
      : 1;
    this.equipmentsService.next([...equipments, equipment]);
  }
  updateEquipment(updatedEquipment: EquipmentI) {
    const equipments = this.equipmentsService.value.map(e =>
      e.equipment_id === updatedEquipment.equipment_id ? updatedEquipment : e
    );
    this.equipmentsService.next(equipments);
  }
}
