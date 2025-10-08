/**
 * Archivo: src/routes/contract.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de contratos de alquiler en Rentool.
 */

import { Application } from "express";
import { ContractController } from "../controllers/contract.controller";
import { authMiddleware } from "../middleware/auth";

export class ContractRoutes {
  public contractController: ContractController = new ContractController();

  public routes(app: Application): void {
    // Listar todos los contratos activos
    app.route("/api/contracts").get(authMiddleware, this.contractController.getAllContracts);

    // Obtener contrato por ID
    app.route("/api/contracts/:id").get(authMiddleware, this.contractController.getContractById);

    // Crear nuevo contrato
    app.route("/api/contracts").post(authMiddleware, this.contractController.createContract);

    // Actualizar contrato existente
    app.route("/api/contracts/:id").patch(authMiddleware, this.contractController.updateContract);

    // Eliminar contrato físicamente
    app.route("/api/contracts/:id").delete(authMiddleware, this.contractController.deleteContract);

    // Eliminar contrato lógicamente (marcar como INACTIVE)
    app.route("/api/contracts/:id/logic").delete(authMiddleware, this.contractController.deleteContractAdv);
  }
}
