/**
 * Archivo: contract-detail.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Contract Detail
 */

export interface ContractDetailI {
  contract_detail_id?: number;
  contract_id: number;
  equipment_id: number;
  quantity: number;
  daily_rate: number;
  days: number;
  subtotal: number;
}
