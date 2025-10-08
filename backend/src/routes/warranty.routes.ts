/**
 * Archivo: src/routes/warranty.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de garantías asociadas a contratos y equipos.
 */

import { Application } from "express";
import { WarrantyController } from "../controllers/warranty.controller";
import { authMiddleware } from "../middleware/auth";

export class WarrantyRoutes {
  public warrantyController: WarrantyController = new WarrantyController();

  public routes(app: Application): void {
    // Listar garantías activas
    app.route("/api/warranties").get(authMiddleware, this.warrantyController.getAllWarranties);

    // Obtener garantía por ID
    app.route("/api/warranties/:id").get(authMiddleware, this.warrantyController.getWarrantyById);

    // Crear nueva garantía
    app.route("/api/warranties").post(authMiddleware, this.warrantyController.createWarranty);

    // Actualizar garantía existente
    app.route("/api/warranties/:id").patch(authMiddleware, this.warrantyController.updateWarranty);

    // Eliminar garantía físicamente
    app.route("/api/warranties/:id").delete(authMiddleware, this.warrantyController.deleteWarranty);

    // Eliminar garantía lógicamente
    app.route("/api/warranties/:id/logic").delete(authMiddleware, this.warrantyController.deleteWarrantyAdv);
  }
}
