/**
 * Archivo: src/routes/category.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de categorías de equipos.
 */

import { Application } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth";

export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    // Listar categorías activas
    app.route("/api/categories").get(authMiddleware, this.categoryController.getAllCategories);

    // Obtener categoría por ID
    app.route("/api/categories/:id").get(authMiddleware, this.categoryController.getCategoryById);

    // Crear categoría
    app.route("/api/categories").post(authMiddleware, this.categoryController.createCategory);

    // Actualizar categoría
    app.route("/api/categories/:id").patch(authMiddleware, this.categoryController.updateCategory);

    // Eliminar categoría físicamente
    app.route("/api/categories/:id").delete(authMiddleware, this.categoryController.deleteCategory);

    // Eliminar categoría lógicamente
    app.route("/api/categories/:id/logic").delete(authMiddleware, this.categoryController.deleteCategoryAdv);
  }
}
