/**
 * Archivo: provider.service.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar proveedores (ProviderI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProviderI } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private providersService = new BehaviorSubject<ProviderI[]>([
    {
      provider_id: 1,
      name: 'Ferretería Central',
      email: 'contacto@ferrecentral.com',
      phone: '3001234567',
      address: 'Av. Principal #45'
    },
    {
      provider_id: 2,
      name: 'Proveedora Andina',
      email: 'ventas@andina.com',
      phone: '3109876543',
      address: 'Calle 89 #12-34'
    }
  ]);

  providers$ = this.providersService.asObservable();

  getProviders() {
    return this.providersService.value;
  }

  addProvider(provider: ProviderI) {
    const providers = this.providersService.value;
    provider.provider_id = providers.length
      ? Math.max(...providers.map(p => p.provider_id ?? 0)) + 1
      : 1;
    this.providersService.next([...providers, provider]);
  }
    // Actualizar proveedor existente
  updateProvider(updatedProvider: ProviderI) {
    const providers = this.providersService.value.map(provider =>
      provider.provider_id === updatedProvider.provider_id ? updatedProvider : provider
    );
    this.providersService.next(providers);
  }

}
