/**
 * Archivo: src/routes/maintenance.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de mantenimientos de equipos en Rentool.
 */

import { Application } from "express";
import { MaintenanceController } from "../controllers/maintenance.controller";
import { authMiddleware } from "../middleware/auth";

export class MaintenanceRoutes {
  public maintenanceController: MaintenanceController = new MaintenanceController();

  public routes(app: Application): void {
    // Listar mantenimientos activos
    app.route("/api/maintenances").get(authMiddleware, this.maintenanceController.getAllMaintenances);

    // Obtener mantenimiento por ID
    app.route("/api/maintenances/:id").get(authMiddleware, this.maintenanceController.getMaintenanceById);

    // Crear nuevo mantenimiento
    app.route("/api/maintenances").post(authMiddleware, this.maintenanceController.createMaintenance);

    // Actualizar mantenimiento existente
    app.route("/api/maintenances/:id").patch(authMiddleware, this.maintenanceController.updateMaintenance);

    // Eliminar mantenimiento físicamente
    app.route("/api/maintenances/:id").delete(authMiddleware, this.maintenanceController.deleteMaintenance);

    // Eliminar mantenimiento lógicamente
    app.route("/api/maintenances/:id/logic").delete(authMiddleware, this.maintenanceController.deleteMaintenanceAdv);
  }
}
