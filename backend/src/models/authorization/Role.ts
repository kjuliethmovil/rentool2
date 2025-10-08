/**
 * Archivo: src/models/authorization/Role.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que representa los roles de usuario dentro del sistema (Administrador, Técnico, etc.).
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";
import { RoleUser } from "./RoleUser";
import { ResourceRole } from "./ResourceRole";

export interface RoleI {
  id?: number;
  name: string;
  description: string;
  is_active: "ACTIVE" | "INACTIVE";
}

export class Role extends Model implements RoleI {
  public id!: number;
  public name!: string;
  public description!: string;
  public is_active!: "ACTIVE" | "INACTIVE";
}

Role.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "roles",
    sequelize,
    timestamps: false,
  }
);

// Relaciones
Role.hasMany(RoleUser, { foreignKey: "role_id", sourceKey: "id" });
RoleUser.belongsTo(Role, { foreignKey: "role_id", targetKey: "id" });

Role.hasMany(ResourceRole, { foreignKey: "role_id", sourceKey: "id" });
ResourceRole.belongsTo(Role, { foreignKey: "role_id", targetKey: "id" });
