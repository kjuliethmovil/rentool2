/**
 * Archivo: src/models/authorization/Resource.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que define los recursos protegidos del sistema (rutas o endpoints).
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";
import { ResourceRole } from "./ResourceRole";

export interface ResourceI {
  id?: number;
  path: string;
  method: string;
  description: string;
  is_active: "ACTIVE" | "INACTIVE";
}

export class Resource extends Model implements ResourceI {
  public id!: number;
  public path!: string;
  public method!: string;
  public description!: string;
  public is_active!: "ACTIVE" | "INACTIVE";
}

Resource.init(
  {
    path: { type: DataTypes.STRING, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "resources",
    sequelize,
    timestamps: false,
  }
);

// Relaciones
Resource.hasMany(ResourceRole, { foreignKey: "resource_id", sourceKey: "id" });
ResourceRole.belongsTo(Resource, { foreignKey: "resource_id", targetKey: "id" });
