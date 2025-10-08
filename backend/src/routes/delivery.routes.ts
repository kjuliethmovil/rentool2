/**
 * Archivo: src/routes/delivery.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de entregas de equipos asociadas a los contratos.
 */

import { Application } from "express";
import { DeliveryController } from "../controllers/delivery.controller";
import { authMiddleware } from "../middleware/auth";

export class DeliveryRoutes {
  public deliveryController: DeliveryController = new DeliveryController();

  public routes(app: Application): void {
    // Listar todas las entregas activas
    app.route("/api/deliveries").get(authMiddleware, this.deliveryController.getAllDeliveries);

    // Obtener entrega por ID
    app.route("/api/deliveries/:id").get(authMiddleware, this.deliveryController.getDeliveryById);

    // Crear nueva entrega
    app.route("/api/deliveries").post(authMiddleware, this.deliveryController.createDelivery);

    // Actualizar entrega
    app.route("/api/deliveries/:id").patch(authMiddleware, this.deliveryController.updateDelivery);

    // Eliminar entrega físicamente
    app.route("/api/deliveries/:id").delete(authMiddleware, this.deliveryController.deleteDelivery);

    // Eliminar entrega lógicamente
    app.route("/api/deliveries/:id/logic").delete(authMiddleware, this.deliveryController.deleteDeliveryAdv);
  }
}
