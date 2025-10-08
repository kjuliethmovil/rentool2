/**
 * Archivo: src/routes/contract_detail.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Rutas para la gestión de los detalles de contrato (equipos, tarifas y días).
 */

import { Application } from "express";
import { ContractDetailController } from "../controllers/contract_detail.controller";
import { authMiddleware } from "../middleware/auth";

export class ContractDetailRoutes {
  public contractDetailController: ContractDetailController = new ContractDetailController();

  public routes(app: Application): void {
    // Listar detalles de contrato
    app.route("/api/contract_details").get(authMiddleware, this.contractDetailController.getAllContractDetails);

    // Obtener detalle de contrato por ID
    app.route("/api/contract_details/:id").get(authMiddleware, this.contractDetailController.getContractDetailById);

    // Crear detalle de contrato
    app.route("/api/contract_details").post(authMiddleware, this.contractDetailController.createContractDetail);

    // Actualizar detalle de contrato
    app.route("/api/contract_details/:id").patch(authMiddleware, this.contractDetailController.updateContractDetail);

    // Eliminar detalle físicamente
    app.route("/api/contract_details/:id").delete(authMiddleware, this.contractDetailController.deleteContractDetail);

    // Eliminar detalle lógicamente
    app.route("/api/contract_details/:id/logic").delete(authMiddleware, this.contractDetailController.deleteContractDetailAdv);
  }
}
