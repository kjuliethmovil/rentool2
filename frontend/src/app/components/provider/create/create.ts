/**
 * Archivo: create.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear un nuevo proveedor usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProviderService } from '../../../services/provider';
import { ProviderI } from '../../../models/provider';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class  ProviderCreate {
  providerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router
  ) {
    // Definición del formulario con validaciones
    this.providerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // Método para guardar un nuevo proveedor
  onSubmit() {
    if (this.providerForm.valid) {
      const newProvider: ProviderI = this.providerForm.value;
      this.providerService.addProvider(newProvider);
      this.router.navigate(['/provider/getall']); // Redirige al listado
    }
  }
}
