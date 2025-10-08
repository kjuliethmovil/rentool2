/**
 * Archivo: src/routes/provider.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de proveedores de equipos.
 */

import { Application } from "express";
import { ProviderController } from "../controllers/provider.controller";
import { authMiddleware } from "../middleware/auth";

export class ProviderRoutes {
  public providerController: ProviderController = new ProviderController();

  public routes(app: Application): void {
    // Listar todos los proveedores
    app.route("/api/providers").get(authMiddleware, this.providerController.getAllProviders);

    // Obtener proveedor por ID
    app.route("/api/providers/:id").get(authMiddleware, this.providerController.getProviderById);

    // Crear nuevo proveedor
    app.route("/api/providers").post(authMiddleware, this.providerController.createProvider);

    // Actualizar proveedor existente
    app.route("/api/providers/:id").patch(authMiddleware, this.providerController.updateProvider);

    // Eliminar proveedor físicamente
    app.route("/api/providers/:id").delete(authMiddleware, this.providerController.deleteProvider);

    // Eliminar proveedor lógicamente
    app.route("/api/providers/:id/logic").delete(authMiddleware, this.providerController.deleteProviderAdv);
  }
}
