/**
 * Archivo: src/models/Returns.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 08/10/2025
 * Descripción: Modelo para registrar devoluciones de equipos.
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Contract } from "./Contract";

export interface ReturnsI {
  id?: number;
  contract_id: number;
  return_date: Date;
  damage_report?: string;
}

export class Returns extends Model implements ReturnsI {
  public id!: number;
  public contract_id!: number;
  public return_date!: Date;
  public damage_report?: string;
}

Returns.init(
  {
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    return_date: { type: DataTypes.DATE, allowNull: false },
    damage_report: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Returns",
    tableName: "returns",
    timestamps: false,
  }
);

Contract.hasOne(Returns, {
  foreignKey: "contract_id",
  sourceKey: "id",
});

Returns.belongsTo(Contract, {
  foreignKey: "contract_id",
  targetKey: "id",
});
