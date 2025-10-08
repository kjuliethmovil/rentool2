/**
 * Archivo: src/routes/client.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de clientes registrados en Rentool.
 */

import { Application } from "express";
import { ClientController } from "../controllers/client.controller";
import { authMiddleware } from "../middleware/auth";

export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    // Obtener todos los clientes activos
    app.route("/api/clients").get(authMiddleware, this.clientController.getAllClients);

    // Obtener cliente por ID
    app.route("/api/clients/:id").get(authMiddleware, this.clientController.getClientById);

    // Crear nuevo cliente
    app.route("/api/clients").post(authMiddleware, this.clientController.createClient);

    // Actualizar cliente existente
    app.route("/api/clients/:id").patch(authMiddleware, this.clientController.updateClient);

    // Eliminar cliente físicamente
    app.route("/api/clients/:id").delete(authMiddleware, this.clientController.deleteClient);

    // Eliminar cliente lógicamente (cambiar a INACTIVE)
    app.route("/api/clients/:id/logic").delete(authMiddleware, this.clientController.deleteClientAdv);
  }
}
