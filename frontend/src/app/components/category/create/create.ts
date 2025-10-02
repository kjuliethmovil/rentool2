/**
 * Archivo: create.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para crear una nueva categoría usando Reactive Forms y TailwindCSS.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../services/category';
import { CategoryI } from '../../../models/category';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateCategory {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    // Definición del formulario con validaciones
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Método para guardar una nueva categoría
  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory: CategoryI = this.categoryForm.value;
      this.categoryService.addCategory(newCategory);
      this.router.navigate(['/category/getall']); // Redirige a la tabla
    }
  }
}
