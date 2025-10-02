/**
 * Archivo: client.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar clientes (ClientI) con datos simulados en memoria.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ClientI } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
   // Estado inicial con algunos clientes de ejemplo
  private clientsService = new BehaviorSubject<ClientI[]>([
    {
      client_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '555-1234',
      address: 'Calle 123, Ciudad'
    },
    {
      client_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '555-5678',
      address: 'Avenida 456, Ciudad'
    }
  ]);

  clients$ = this.clientsService.asObservable();

  // Obtener todos los clientes
  getClients() {
    return this.clientsService.value;
  }

  // Agregar un nuevo cliente
  addClient(client: ClientI) {
    const clients = this.clientsService.value;
    client.client_id = clients.length
      ? Math.max(...clients.map(c => c.client_id ?? 0)) + 1
      : 1;
    this.clientsService.next([...clients, client]);
  }
  updateClient(updatedClient: ClientI) {
    const clients = this.clientsService.value.map(client =>
      client.client_id === updatedClient.client_id ? updatedClient : client
    );
    this.clientsService.next(clients);
  }
}
