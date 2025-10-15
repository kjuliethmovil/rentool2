/**
 * Archivo: src/routes/authorization/refresh_token.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Rutas para la gestión de refresh tokens (autenticación segura).
 */

import { Application } from "express";
import { RefreshTokenController } from "../../controllers/authorization/refresh_token.controller";

export class RefreshTokenRoutes {
  public refreshTokenController: RefreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/refresh-tokens")
      .get(this.refreshTokenController.getAllRefreshTokens)
      .post(this.refreshTokenController.createRefreshToken);

    app.route("/api/refresh-tokens/:id")
      .get(this.refreshTokenController.getRefreshTokenById)
      .patch(this.refreshTokenController.updateRefreshToken)
      .delete(this.refreshTokenController.deleteRefreshToken);

    app.route("/api/refresh-tokens/:id/invalidate")
      .patch(this.refreshTokenController.invalidateRefreshToken);

    // ================== RUTAS CON AUTENTICACIÓN ==================
  }
}
