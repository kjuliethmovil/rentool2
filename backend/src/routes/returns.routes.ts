/**
 * Archivo: src/routes/returns.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de devoluciones de equipos en Rentool.
 */

import { Application } from "express";
import { ReturnsController } from "../controllers/returns.controller";
import { authMiddleware } from "../middleware/auth";

export class ReturnsRoutes {
  public returnsController: ReturnsController = new ReturnsController();

  public routes(app: Application): void {
    // Listar todas las devoluciones activas
    app.route("/api/returns").get(authMiddleware, this.returnsController.getAllReturns);

    // Obtener devolución por ID
    app.route("/api/returns/:id").get(authMiddleware, this.returnsController.getReturnById);

    // Crear nueva devolución
    app.route("/api/returns").post(authMiddleware, this.returnsController.createReturn);

    // Actualizar devolución existente
    app.route("/api/returns/:id").patch(authMiddleware, this.returnsController.updateReturn);

    // Eliminar devolución físicamente
    app.route("/api/returns/:id").delete(authMiddleware, this.returnsController.deleteReturn);

    // Eliminar devolución lógicamente
    app.route("/api/returns/:id/logic").delete(authMiddleware, this.returnsController.deleteReturnAdv);
  }
}
