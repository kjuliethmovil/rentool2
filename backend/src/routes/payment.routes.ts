/**
 * Archivo: src/routes/payment.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de pagos realizados por los contratos.
 */

import { Application } from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // Listar todos los pagos activos
    app.route("/api/payments").get(authMiddleware, this.paymentController.getAllPayments);

    // Obtener pago por ID
    app.route("/api/payments/:id").get(authMiddleware, this.paymentController.getPaymentById);

    // Crear nuevo pago
    app.route("/api/payments").post(authMiddleware, this.paymentController.createPayment);

    // Actualizar pago existente
    app.route("/api/payments/:id").patch(authMiddleware, this.paymentController.updatePayment);

    // Eliminar pago físicamente
    app.route("/api/payments/:id").delete(authMiddleware, this.paymentController.deletePayment);

    // Eliminar pago lógicamente
    app.route("/api/payments/:id/logic").delete(authMiddleware, this.paymentController.deletePaymentAdv);
  }
}
