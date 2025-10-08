/**
 * Archivo: src/models/authorization/ResourceRole.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo intermedio que asocia roles con recursos (control de permisos por ruta).
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";

export interface ResourceRoleI {
  id?: number;
  role_id: number;
  resource_id: number;
  is_active: "ACTIVE" | "INACTIVE";
}

export class ResourceRole extends Model implements ResourceRoleI {
  public id!: number;
  public role_id!: number;
  public resource_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

ResourceRole.init(
  {
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    resource_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "resource_roles",
    sequelize,
    timestamps: false,
  }
);
