/**
 * Archivo: src/routes/auth.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para el módulo de autenticación (login, registro, logout, refresh token).
 */

import { Application } from "express";
import { AuthController } from "../controllers/authorization/auth.controller";

export class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes(app: Application): void {
    app.route("/api/auth/register").post(this.authController.register);
    app.route("/api/auth/login").post(this.authController.login);
    app.route("/api/auth/refresh").post(this.authController.refreshToken);
    app.route("/api/auth/logout").post(this.authController.logout);
  }
}
