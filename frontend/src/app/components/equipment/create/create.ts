/**
 * Archivo: create.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear un nuevo equipo usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EquipmentService } from '../../../services/equipment';
import { EquipmentI } from '../../../models/equipment';

@Component({
  selector: 'app-equipment-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class EquipmentCreate {
  equipmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private router: Router
  ) {
    this.equipmentForm = this.fb.group({
      category_id: ['', Validators.required],
      provider_id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      daily_rate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.equipmentForm.valid) {
      const newEquipment: EquipmentI = this.equipmentForm.value;
      this.equipmentService.addEquipment(newEquipment);
      this.router.navigate(['/equipment/getall']);
    }
  }
}
