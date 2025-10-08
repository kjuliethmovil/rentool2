/**
 * Archivo: src/routes/role.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de roles dentro del sistema Rentool.
 */

import { Application } from "express";
import { RoleController } from "../controllers/role.controller";
import { authMiddleware } from "../middleware/auth";

export class RoleRoutes {
  public roleController: RoleController = new RoleController();

  public routes(app: Application): void {
    app.route("/api/roles").get(authMiddleware, this.roleController.getAll);
    app.route("/api/roles").post(authMiddleware, this.roleController.create);
    app.route("/api/roles/:id").patch(authMiddleware, this.roleController.update);
    app.route("/api/roles/:id").delete(authMiddleware, this.roleController.delete);
  }
}
