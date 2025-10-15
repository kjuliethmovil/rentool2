/**
 * Archivo: src/routes/authorization/role.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Rutas para la gestión de roles del sistema Rentool.
 */

import { Application } from "express";
import { RoleController } from "../../controllers/authorization/role.controller";

export class RoleRoutes {
  public roleController: RoleController = new RoleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/roles")
      .get(this.roleController.getAllRoles)
      .post(this.roleController.createRole);

    app.route("/api/roles/:id")
      .get(this.roleController.getRoleById)
      .patch(this.roleController.updateRole)
      .delete(this.roleController.deleteRole);

    app.route("/api/roles/:id/logic")
      .delete(this.roleController.deleteRoleAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
  }
}
