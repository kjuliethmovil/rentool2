/**
 * Archivo: getall.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para listar todas las categorías usando PrimeNG Table y TailwindCSS.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CategoryI } from '../../../models/category';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category';


@Component({
  selector: 'app-getall',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './getall.html',
  styleUrls: ['./getall.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryGetall {
  categories: CategoryI[] = [];

  // Se inyecta el servicio y se suscribe al observable de categorías
  constructor(private categoryService: CategoryService) {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

}
