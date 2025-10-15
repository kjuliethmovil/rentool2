/**
 * Archivo: src/database/connection.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Configuración dinámica de conexión a la base de datos para Rentool2
 * con soporte para MySQL, PostgreSQL, SQL Server y Oracle. Incluye funciones
 * de prueba y diagnóstico de conexión, integradas con Sequelize.
 */

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ==============================
// CONFIGURACIÓN DINÁMICA DEL MOTOR
// ==============================
let dbConfig: any = {};
let engineName: string = process.env.DB_DIALECT || "mysql";

switch (engineName) {
  case "postgres":
    dbConfig = {
      database: process.env.PG_NAME,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT) || 5432,
      dialect: "postgres",
      timezone: process.env.DB_TIMEZONE || "America/Bogota",
      logging: false,
    };
    break;

  case "mssql":
    dbConfig = {
      database: process.env.MSSQL_NAME,
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASS,
      host: process.env.MSSQL_HOST,
      port: Number(process.env.MSSQL_PORT) || 1433,
      dialect: "mssql",
      dialectOptions: { options: { encrypt: false } },
      timezone: process.env.DB_TIMEZONE || "America/Bogota",
      logging: false,
    };
    break;

  case "oracle":
    dbConfig = {
      database: process.env.ORACLE_NAME,
      username: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASS,
      host: process.env.ORACLE_HOST,
      port: Number(process.env.ORACLE_PORT) || 1521,
      dialect: "oracle",
      dialectModule: require("oracledb"),
      dialectOptions: {
        connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_SID}`,
      },
      timezone: process.env.DB_TIMEZONE || "America/Bogota",
      logging: false,
    };
    break;

  default: // MySQL por defecto
    dbConfig = {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      timezone: process.env.DB_TIMEZONE || "America/Bogota",
      logging: false,
    };
    break;
}

// ==============================
// INSTANCIA PRINCIPAL DE SEQUELIZE
// ==============================
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// ==============================
// FUNCIONES AUXILIARES
// ==============================

// Verifica la conexión a la base de datos
export async function testConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión establecida correctamente a ${engineName.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error(`❌ Error al conectar con ${engineName.toUpperCase()}:`, error);
    return false;
  }
}

// Devuelve información básica del motor en uso
export function getDatabaseInfo() {
  return {
    engine: engineName,
    database:
      dbConfig.database ||
      process.env.DB_NAME ||
      process.env.PG_NAME ||
      process.env.MSSQL_NAME ||
      process.env.ORACLE_NAME,
    host: dbConfig.host,
    port: dbConfig.port,
  };
}

// ==============================
// PRUEBA AUTOMÁTICA EN MODO DEV
// ==============================
(async () => {
  if (process.env.NODE_ENV !== "production") {
    const connected = await testConnection();
    if (!connected) {
      console.warn("⚠️  No se pudo establecer conexión inicial con la base de datos.");
    }
  }
})();
