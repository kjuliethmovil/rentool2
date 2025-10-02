/**
 * Archivo: update.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar clientes usando Reactive Forms y TailwindCSS.
 */

import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../../services/client';
import { ClientI } from '../../../models/client';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class ClientUpdate implements OnInit {
  clientForm: FormGroup;
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicialización del formulario
    this.clientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID desde la ruta
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));

    // Buscar cliente en el servicio
    const client = this.clientService.getClients().find(c => c.client_id === this.clientId);

    if (client) {
      this.clientForm.patchValue(client); // Rellenar el formulario
    }
  }

  // Método para actualizar cliente
  onSubmit() {
    if (this.clientForm.valid) {
      const updatedClient: ClientI = {
        client_id: this.clientId,
        ...this.clientForm.value
      };

      this.clientService.updateClient(updatedClient);
      this.router.navigate(['/client/getall']); // Redirige a la tabla
    }
  }
}
