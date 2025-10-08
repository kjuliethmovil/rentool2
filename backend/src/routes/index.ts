/**
 * Archivo: src/routes/index.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Archivo principal que agrupa y registra todas las rutas del backend de Rentool.
 */

import { Application } from "express";

// Importación de rutas del módulo de autorización
import { AuthRoutes } from "./auth.routes";
import { RoleRoutes } from "./role.routes";
import { RoleUserRoutes } from "./role_user.routes";
import { ResourceRoutes } from "./resource.routes";
import { ResourceRoleRoutes } from "./resourceRole.routes";

// Importación de rutas de las entidades principales
import { ClientRoutes } from "./client.routes";
import { ProviderRoutes } from "./provider.routes";
import { CategoryRoutes } from "./category.routes";
import { EquipmentRoutes } from "./equipment.routes";
import { ContractRoutes } from "./contract.routes";
import { ContractDetailRoutes } from "./contract_detail.routes";
import { WarrantyRoutes } from "./warranty.routes";
import { DeliveryRoutes } from "./delivery.routes";
import { ReturnsRoutes } from "./returns.routes";
import { PaymentRoutes } from "./payment.routes";
import { MaintenanceRoutes } from "./maintenance.routes";

export class Routes {
  // Instanciación de todas las rutas
  public authRoutes: AuthRoutes = new AuthRoutes();
  public roleRoutes: RoleRoutes = new RoleRoutes();
  public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
  public resourceRoutes: ResourceRoutes = new ResourceRoutes();
  public resourceRoleRoutes: ResourceRoleRoutes = new ResourceRoleRoutes();

  public clientRoutes: ClientRoutes = new ClientRoutes();
  public providerRoutes: ProviderRoutes = new ProviderRoutes();
  public categoryRoutes: CategoryRoutes = new CategoryRoutes();
  public equipmentRoutes: EquipmentRoutes = new EquipmentRoutes();
  public contractRoutes: ContractRoutes = new ContractRoutes();
  public contractDetailRoutes: ContractDetailRoutes = new ContractDetailRoutes();
  public warrantyRoutes: WarrantyRoutes = new WarrantyRoutes();
  public deliveryRoutes: DeliveryRoutes = new DeliveryRoutes();
  public returnsRoutes: ReturnsRoutes = new ReturnsRoutes();
  public paymentRoutes: PaymentRoutes = new PaymentRoutes();
  public maintenanceRoutes: MaintenanceRoutes = new MaintenanceRoutes();

  /**
   * Método principal que registra todas las rutas en la aplicación Express.
   * @param app Instancia principal de la aplicación Express
   */
  public routes(app: Application): void {
    // Módulo de autorización y seguridad
    this.authRoutes.routes(app);
    this.roleRoutes.routes(app);
    this.roleUserRoutes.routes(app);
    this.resourceRoutes.routes(app);
    this.resourceRoleRoutes.routes(app);

    // Entidades principales del sistema Rentool
    this.clientRoutes.routes(app);
    this.providerRoutes.routes(app);
    this.categoryRoutes.routes(app);
    this.equipmentRoutes.routes(app);
    this.contractRoutes.routes(app);
    this.contractDetailRoutes.routes(app);
    this.warrantyRoutes.routes(app);
    this.deliveryRoutes.routes(app);
    this.returnsRoutes.routes(app);
    this.paymentRoutes.routes(app);
    this.maintenanceRoutes.routes(app);

    // Mensaje de confirmación en consola
    console.log("✅ Todas las rutas fueron registradas correctamente en Rentool.");
  }
}
