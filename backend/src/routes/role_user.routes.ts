/**
 * Archivo: src/routes/role_user.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la asignación de roles a usuarios.
 */

import { Application } from "express";
import { RoleUserController } from "../controllers/role_user.controller";
import { authMiddleware } from "../middleware/auth";

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    app.route("/api/role_users").get(authMiddleware, this.roleUserController.getAll);
    app.route("/api/role_users").post(authMiddleware, this.roleUserController.assignRole);
    app.route("/api/role_users/:id").delete(authMiddleware, this.roleUserController.delete);
  }
}
