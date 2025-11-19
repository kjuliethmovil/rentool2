/**
 * Archivo: create.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear un nuevo cliente usando Reactive Forms y TailwindCSS.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../../services/client';
import { ClientI } from '../../../models/client';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class ClientCreate{
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    // Definición del formulario con validaciones
    this.clientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // Método para guardar un nuevo cliente
  onSubmit() {
    if (this.clientForm.valid) {
      const newClient: ClientI = this.clientForm.value;
      this.clientService.createClient(newClient).subscribe({
        next: () => {
          this.router.navigate(['/client/getall']); // redirige a la tabla
        },
        error: (error) => {
          console.error('Error creating client:', error);
        }
      });
    }
  }
}
