/**
 * Archivo: provider.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Provider
 */

export interface ProviderI {
  provider_id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ProviderResponseI {
  provider_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}