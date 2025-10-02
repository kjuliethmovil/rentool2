/**
 * Archivo: category.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Servicio para gestionar categorías (CategoryI) con datos simulados en memoria.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CategoryI } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   // Estado inicial con algunos datos de ejemplo
  private categoriesService = new BehaviorSubject<CategoryI[]>([
    {
      category_id: 1,
      name: 'Herramientas eléctricas',
      description: 'Taladros, sierras, pulidoras y más'
    },
    {
      category_id: 2,
      name: 'Herramientas manuales',
      description: 'Martillos, destornilladores, llaves, etc.'
    }
  ]);

  categories$ = this.categoriesService.asObservable();

  // Obtener todas las categorías
  getCategories() {
    return this.categoriesService.value;
  }

  // Agregar nueva categoría
  addCategory(category: CategoryI) {
    const categories = this.categoriesService.value;
    category.category_id = categories.length
      ? Math.max(...categories.map(c => c.category_id ?? 0)) + 1
      : 1;
    this.categoriesService.next([...categories, category]);
  }
    // Actualizar categoría existente
  updateCategory(updatedCategory: CategoryI) {
    const categories = this.categoriesService.value.map(category =>
      category.category_id === updatedCategory.category_id ? updatedCategory : category
    );
    this.categoriesService.next(categories);
  }


}
