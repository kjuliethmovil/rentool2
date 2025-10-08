/**
 * Archivo: src/routes/resourceRole.routes.ts
 * Autor: Karyn Movil Estacio
 * Descripción: Rutas para la gestión de relaciones entre recursos y roles.
 */

import { Application } from "express";
import { ResourceRoleController } from "../controllers/resourceRole.controller";
import { authMiddleware } from "../middleware/auth";

export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    app.route("/api/resource-roles").get(
      authMiddleware,
      this.resourceRoleController.getAllResourceRoles
    );

    app.route("/api/resource-roles").post(
      authMiddleware,
      this.resourceRoleController.createResourceRole
    );
  }
}
