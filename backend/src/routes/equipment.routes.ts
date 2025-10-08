/**
 * Archivo: src/routes/equipment.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de equipos disponibles para alquiler.
 */

import { Application } from "express";
import { EquipmentController } from "../controllers/equipment.controller";
import { authMiddleware } from "../middleware/auth";

export class EquipmentRoutes {
  public equipmentController: EquipmentController = new EquipmentController();

  public routes(app: Application): void {
    // Listar todos los equipos activos
    app.route("/api/equipments").get(authMiddleware, this.equipmentController.getAllEquipments);

    // Obtener equipo por ID
    app.route("/api/equipments/:id").get(authMiddleware, this.equipmentController.getEquipmentById);

    // Crear nuevo equipo
    app.route("/api/equipments").post(authMiddleware, this.equipmentController.createEquipment);

    // Actualizar equipo existente
    app.route("/api/equipments/:id").patch(authMiddleware, this.equipmentController.updateEquipment);

    // Eliminar equipo físicamente
    app.route("/api/equipments/:id").delete(authMiddleware, this.equipmentController.deleteEquipment);

    // Eliminar equipo lógicamente
    app.route("/api/equipments/:id/logic").delete(authMiddleware, this.equipmentController.deleteEquipmentAdv);
  }
}
