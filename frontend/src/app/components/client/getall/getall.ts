/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todos los clientes usando PrimeNG Table.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ClientI } from '../../../models/client';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client';

@Component({
  selector: 'app-getall',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientGetall {
  clients: ClientI[] = [];

  constructor(private clientService: ClientService) {
    this.clientService.clients$.subscribe(clients => {
      this.clients = clients;
    });
  }

}
