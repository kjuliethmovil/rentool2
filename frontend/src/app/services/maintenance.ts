/**
 * Archivo: maintenance.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar mantenimientos (MaintenanceI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MaintenanceI } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private maintenancesService = new BehaviorSubject<MaintenanceI[]>([
    {
      maintenance_id: 1,
      equipment_id: 1,
      date: new Date('2025-02-01'),
      description: 'Cambio de broca y revisión general',
      cost: 30.5,
      status: 'COMPLETED'
    }
  ]);

  maintenances$ = this.maintenancesService.asObservable();

  getMaintenances() {
    return this.maintenancesService.value;
  }

  addMaintenance(maintenance: MaintenanceI) {
    const maintenances = this.maintenancesService.value;
    maintenance.maintenance_id = maintenances.length
      ? Math.max(...maintenances.map(m => m.maintenance_id ?? 0)) + 1
      : 1;
    this.maintenancesService.next([...maintenances, maintenance]);
  }
  updateMaintenance(updatedMaintenance: MaintenanceI) {
    const maintenances = this.maintenancesService.value.map(m =>
      m.maintenance_id === updatedMaintenance.maintenance_id ? updatedMaintenance : m
    );
    this.maintenancesService.next(maintenances);
  }
}

