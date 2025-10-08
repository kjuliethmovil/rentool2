/**
 * Archivo: src/models/authorization/RoleUser.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo intermedio que asocia usuarios con roles (muchos a muchos).
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";

export interface RoleUserI {
  id?: number;
  user_id: number;
  role_id: number;
  is_active: "ACTIVE" | "INACTIVE";
}

export class RoleUser extends Model implements RoleUserI {
  public id!: number;
  public user_id!: number;
  public role_id!: number;
  public is_active!: "ACTIVE" | "INACTIVE";
}

RoleUser.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "role_users",
    sequelize,
    timestamps: false,
  }
);
