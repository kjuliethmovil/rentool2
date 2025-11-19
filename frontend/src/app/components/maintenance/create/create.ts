/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para registrar un mantenimiento (Maintenance) usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MaintenanceService } from '../../../services/maintenance';
import { MaintenanceI } from '../../../models/maintenance';

@Component({
  selector: 'app-maintenance-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class MaintenanceCreate {
  maintenanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {
    this.maintenanceForm = this.fb.group({
      equipment_id: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.maintenanceForm.valid) {
      const newMaintenance: MaintenanceI = this.maintenanceForm.value;
      this.maintenanceService.createMaintenance(newMaintenance).subscribe(() => {
        this.router.navigate(['/maintenance/getall']);
      });
    }
  }
}
