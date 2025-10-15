/**
 * Archivo: src/routes/authorization/auth.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 15/10/2025
 * Descripción: Definición de rutas del módulo de autenticación (registro, login, refresh, logout).
 */

import { Application } from "express";
import { AuthController } from "../../controllers/authorization/auth.controller";

export class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes(app: Application): void {
    // ================== RUTAS PÚBLICAS ==================
    app.route("/api/auth/register").post(this.authController.register);
    app.route("/api/auth/login").post(this.authController.login);

    // ================== RUTAS PROTEGIDAS ==================
    app.route("/api/auth/refresh").post(this.authController.refreshToken);
    app.route("/api/auth/logout").post(this.authController.logout);
  }
}
