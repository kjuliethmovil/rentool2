/**
 * Archivo: src/models/ContractDetail.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 08/10/2025
 * Descripción: Modelo que representa el detalle de cada contrato (equipos, días y tarifas).
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Contract } from "./Contract";
import { Equipment } from "./Equipment";

export interface ContractDetailI {
  id?: number;
  contract_id: number;
  equipment_id: number;
  days: number;
  rate: number;
}

export class ContractDetail extends Model implements ContractDetailI {
  public id!: number;
  public contract_id!: number;
  public equipment_id!: number;
  public days!: number;
  public rate!: number;
}

ContractDetail.init(
  {
    contract_id: { type: DataTypes.INTEGER, allowNull: false },
    equipment_id: { type: DataTypes.INTEGER, allowNull: false },
    days: { type: DataTypes.INTEGER, allowNull: false },
    rate: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "ContractDetail",
    tableName: "contract_details",
    timestamps: false,
  }
);

Contract.hasMany(ContractDetail, {
  foreignKey: "contract_id",
  sourceKey: "id",
});

ContractDetail.belongsTo(Contract, {
  foreignKey: "contract_id",
  targetKey: "id",
});

Equipment.hasMany(ContractDetail, {
  foreignKey: "equipment_id",
  sourceKey: "id",
});

ContractDetail.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  targetKey: "id",
});
