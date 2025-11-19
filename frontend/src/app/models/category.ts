/**
 * Archivo: category.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Modelo para la entidad Category
 */

export interface CategoryI {
  category_id?: number;
  name: string;
  description: string;
}

export interface CategoryResponseI {
  category_id: number;
  name: string;
  description: string;
}
