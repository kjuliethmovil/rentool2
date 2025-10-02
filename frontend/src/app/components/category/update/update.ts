/**
 * Archivo: update.component.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Componente para actualizar una categoría existente usando Reactive Forms y TailwindCSS.
 */


import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryService } from '../../../services/category';
import { CategoryI } from '../../../models/category';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class CategoryUpdateComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicialización del formulario
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Se obtiene el ID de la ruta
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    // Se busca la categoría en el servicio
    const category = this.categoryService.getCategories().find(c => c.category_id === this.categoryId);

    if (category) {
      // Se rellenan los campos del formulario con los valores existentes
      this.categoryForm.patchValue(category);
    }
  }

  // Método para actualizar categoría
  onSubmit() {
    if (this.categoryForm.valid) {
      const updatedCategory: CategoryI = {
        category_id: this.categoryId,
        ...this.categoryForm.value
      };

      this.categoryService.updateCategory(updatedCategory);
      this.router.navigate(['/category/getall']); // Redirige al listado
    }
  }
}
