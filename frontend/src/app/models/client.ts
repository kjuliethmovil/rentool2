/**
 * Archivo: client.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Client
 */

export interface ClientI {
  client_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
}
