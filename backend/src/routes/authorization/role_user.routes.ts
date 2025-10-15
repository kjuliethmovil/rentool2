/**
 * Archivo: src/routes/authorization/role_user.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Rutas para la asignación de roles a usuarios.
 */

import { Application } from "express";
import { RoleUserController } from "../../controllers/authorization/role_user.controller";

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/role-users")
      .get(this.roleUserController.getAllRoleUsers)
      .post(this.roleUserController.createRoleUser);

    app.route("/api/role-users/:id")
      .get(this.roleUserController.getRoleUserById)
      .patch(this.roleUserController.updateRoleUser)
      .delete(this.roleUserController.deleteRoleUser);

    app.route("/api/role-users/:id/logic")
      .delete(this.roleUserController.deleteRoleUserAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
  }
}
