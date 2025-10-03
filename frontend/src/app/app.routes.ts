/**
 * Archivo: app.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 2025-10-02
 * Descripción: Definición de las rutas principales de la aplicación Rentool2 en plural (español)
 */

import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';


// Importación de componentes de Clientes
import { ClientGetall } from './components/client/getall/getall';
import { ClientCreate } from './components/client/create/create';
import { ClientUpdate } from './components/client/update/update';

// Importación de componentes de Proveedores
import { ProviderGetall } from './components/provider/getall/getall';
import { ProviderCreate } from './components/provider/create/create';
import { ProviderUpdate } from './components/provider/update/update';

// Importación de componentes de Equipos
import { EquipmentGetall } from './components/equipment/getall/getall';
import { EquipmentCreate } from './components/equipment/create/create';
import { EquipmentUpdate } from './components/equipment/update/update';

// Importación de componentes de Categorías
import { CategoryGetall } from './components/category/getall/getall';
import { CreateCategory } from './components/category/create/create';
import { UpdateCategory } from './components/category/update/update';

// Importación de componentes de Mantenimientos
import { MaintenanceGetall } from './components/maintenance/getall/getall';
import { MaintenanceCreate } from './components/maintenance/create/create';
import { MaintenanceUpdate } from './components/maintenance/update/update';

// Importación de componentes de Contratos
import { ContractGetall } from './components/contract/getall/getall';
import { ContractCreate } from './components/contract/create/create';
import { ContractUpdate } from './components/contract/update/update';

// Importación de componentes de Detalle de Contrato
import { ContractDetailGetall } from './components/contract-detail/getall/getall';
import { ContractDetailCreate } from './components/contract-detail/create/create';
import { ContractDetailUpdate } from './components/contract-detail/update/update';

// Importación de componentes de Garantías
import { WarrantyGetall } from './components/warranty/getall/getall';
import { WarrantyCreate } from './components/warranty/create/create';
import { WarrantyUpdate } from './components/warranty/update/update';

// Importación de componentes de Entregas
import { DeliveryGetall } from './components/delivery/getall/getall';
import { DeliveryCreate } from './components/delivery/create/create';
import { DeliveryUpdate } from './components/delivery/update/update';

// Importación de componentes de Devoluciones (returns)
import { ReturnsGetall } from './components/returns/getall/getall';
import { ReturnsCreate } from './components/returns/create/create';
import { ReturnsUpdate } from './components/returns/update/update';

// Importación de componentes de Pagos
import { PaymentGetall } from './components/payment/getall/getall';
import { PaymentCreate } from './components/payment/create/create';
import { PaymentUpdate } from './components/payment/update/update';

export const routes: Routes = [
  // Rutas de Clientes
  { path: 'clientes', component: ClientGetall },
  { path: 'clientes/nuevo', component: ClientCreate },
  { path: 'clientes/editar/:id', component: ClientUpdate },

  // Rutas de Proveedores
  { path: 'proveedores', component: ProviderGetall },
  { path: 'proveedores/nuevo', component: ProviderCreate },
  { path: 'proveedores/editar/:id', component: ProviderUpdate },

  // Rutas de Equipos
  { path: 'equipos', component: EquipmentGetall },
  { path: 'equipos/nuevo', component: EquipmentCreate },
  { path: 'equipos/editar/:id', component: EquipmentUpdate },

  // Rutas de Categorías
  { path: 'categorias', component: CategoryGetall },
  { path: 'categorias/nuevo', component: CreateCategory },
  { path: 'categorias/editar/:id', component: UpdateCategory },

  // Rutas de Mantenimientos
  { path: 'mantenimientos', component: MaintenanceGetall },
  { path: 'mantenimientos/nuevo', component: MaintenanceCreate },
  { path: 'mantenimientos/editar/:id', component: MaintenanceUpdate },

  // Rutas de Contratos
  { path: 'contratos', component: ContractGetall },
  { path: 'contratos/nuevo', component: ContractCreate },
  { path: 'contratos/editar/:id', component: ContractUpdate },

  // Rutas de Detalle de Contrato
  { path: 'detalles-contrato', component: ContractDetailGetall },
  { path: 'detalles-contrato/nuevo', component: ContractDetailCreate },
  { path: 'detalles-contrato/editar/:id', component: ContractDetailUpdate },

  // Rutas de Garantías
  { path: 'garantias', component: WarrantyGetall },
  { path: 'garantias/nuevo', component: WarrantyCreate },
  { path: 'garantias/editar/:id', component: WarrantyUpdate },

  // Rutas de Entregas
  { path: 'entregas', component: DeliveryGetall },
  { path: 'entregas/nuevo', component: DeliveryCreate },
  { path: 'entregas/editar/:id', component: DeliveryUpdate },

  // Rutas de Devoluciones
  { path: 'devoluciones', component: ReturnsGetall },
  { path: 'devoluciones/nuevo', component: ReturnsCreate },
  { path: 'devoluciones/editar/:id', component: ReturnsUpdate },

  // Rutas de Pagos
  { path: 'pagos', component: PaymentGetall },
  { path: 'pagos/nuevo', component: PaymentCreate },
  { path: 'pagos/editar/:id', component: PaymentUpdate },

  // Redirección por defecto
  { path: '', component: DashboardComponent, pathMatch: 'full' },

  // Wildcard para rutas no encontradas
  { path: '**', component: DashboardComponent }
];
