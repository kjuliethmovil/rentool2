/**
 * Archivo: src/routes/resource.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de recursos (endpoints protegidos).
 */

import { Application } from "express";
import { ResourceController } from "../controllers/resource.controller";
import { authMiddleware } from "../middleware/auth";


export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    app.route("/api/resources").get(authMiddleware, this.resourceController.getAllResources);
    app.route("/api/resources").post(authMiddleware, this.resourceController.createResource);
  }
}

