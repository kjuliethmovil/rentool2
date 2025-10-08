/**
 * Archivo: src/models/authorization/RefreshToken.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Modelo que almacena los refresh tokens generados al autenticar usuarios.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/connection";
import { User } from "./User";

export interface RefreshTokenI {
  id?: number;
  user_id: number;
  token: string;
  device_info: string;
  is_valid: boolean;
  expires_at: Date;
}

export class RefreshToken extends Model implements RefreshTokenI {
  public id!: number;
  public user_id!: number;
  public token!: string;
  public device_info!: string;
  public is_valid!: boolean;
  public expires_at!: Date;
}

RefreshToken.init(
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    device_info: { type: DataTypes.STRING, allowNull: true },
    is_valid: { type: DataTypes.BOOLEAN, defaultValue: true },
    expires_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "refresh_tokens",
    sequelize,
    timestamps: false,
  }
);

// Relación: un usuario tiene muchos refresh tokens
User.hasMany(RefreshToken, { foreignKey: "user_id", sourceKey: "id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
