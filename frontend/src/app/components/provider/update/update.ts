/**
 * Archivo: update.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar un proveedor existente usando Reactive Forms y TailwindCSS.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProviderService } from '../../../services/provider';
import { ProviderI } from '../../../models/provider';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class ProviderUpdate implements OnInit {
  providerForm: FormGroup;
  providerId!: number;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicialización del formulario
    this.providerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Se obtiene el ID desde la ruta
    this.providerId = Number(this.route.snapshot.paramMap.get('id'));

    // Buscar proveedor en el servicio
    const provider = this.providerService.getProviders().find(p => p.provider_id === this.providerId);

    if (provider) {
      // Rellenar el formulario con los datos existentes
      this.providerForm.patchValue(provider);
    }
  }

  // Método para actualizar proveedor
  onSubmit() {
    if (this.providerForm.valid) {
      const updatedProvider: ProviderI = {
        provider_id: this.providerId,
        ...this.providerForm.value
      };

      this.providerService.updateProvider(updatedProvider);
      this.router.navigate(['/provider/getall']); // Redirige al listado
    }
  }
}
