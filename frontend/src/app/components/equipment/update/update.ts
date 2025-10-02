/**
 * Archivo: update.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un equipo usando Reactive Forms y TailwindCSS.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EquipmentService } from '../../../services/equipment';
import { EquipmentI } from '../../../models/equipment';

@Component({
  selector: 'app-equipment-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class EquipmentUpdate implements OnInit {
  equipmentForm: FormGroup;
  equipmentId!: number;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.equipmentId = Number(this.route.snapshot.paramMap.get('id'));

    const equipment = this.equipmentService.getEquipments().find(e => e.equipment_id === this.equipmentId);

    if (equipment) {
      this.equipmentForm.patchValue(equipment);
    }
  }

  onSubmit() {
    if (this.equipmentForm.valid) {
      const updatedEquipment: EquipmentI = {
        equipment_id: this.equipmentId,
        ...this.equipmentForm.value
      };

      this.equipmentService.updateEquipment(updatedEquipment);
      this.router.navigate(['/equipment/getall']);
    }
  }
}
