/**
 * Archivo: delivery.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar entregas (DeliveryI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DeliveryI } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveriesService = new BehaviorSubject<DeliveryI[]>([
    {
      delivery_id: 1,
      contract_id: 1,
      date: new Date('2025-01-02'),
      address: 'Calle 789, Ciudad',
      status: 'PENDING',
      notes: 'Entrega programada para el cliente 1'
    }
  ]);

  deliveries$ = this.deliveriesService.asObservable();

  getDeliveries() {
    return this.deliveriesService.value;
  }

  addDelivery(delivery: DeliveryI) {
    const deliveries = this.deliveriesService.value;
    delivery.delivery_id = deliveries.length
      ? Math.max(...deliveries.map(d => d.delivery_id ?? 0)) + 1
      : 1;
    this.deliveriesService.next([...deliveries, delivery]);
  }
  updateDelivery(updatedDelivery: DeliveryI) {
    const deliveries = this.deliveriesService.value.map(d =>
      d.delivery_id === updatedDelivery.delivery_id ? updatedDelivery : d
    );
    this.deliveriesService.next(deliveries);
  }
}
