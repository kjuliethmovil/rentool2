/**
 * Archivo: src/config/index.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Configuración principal de la aplicación Express para Rentool2.
 * Adaptado según las buenas prácticas del profesor, con verificación de conexión a la base de datos
 * y registro completo de módulos de rutas.
 */

import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize, testConnection, getDatabaseInfo } from "../database/connection";
import { Routes } from "../routes/index";

dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Verifica y sincroniza la base de datos
  }

  // ==============================
  // CONFIGURACIÓN BÁSICA
  // ==============================
  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    // Logger
    this.app.use(morgan("dev"));

    // Configuración avanzada de CORS
    const corsOptions = {
      origin: "http://localhost:4200", // solo tu frontend Angular
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // permite envío de cookies o auth headers
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(corsOptions));

    // Para procesar JSON y formularios
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    // Middleware de auditoría de respuestas
    this.app.use(this.responseLogger());
  }

  // ==============================
  // CONFIGURACIÓN DE RUTAS
  // ==============================
  private routes(): void {
    // --- ENTIDADES RENTOOL2 ---
    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.categoryRoutes.routes(this.app);
    this.routePrv.contractDetailRoutes.routes(this.app);
    this.routePrv.contractRoutes.routes(this.app);
    this.routePrv.deliveryRoutes.routes(this.app);
    this.routePrv.equipmentRoutes.routes(this.app);
    this.routePrv.maintenanceRoutes.routes(this.app);
    this.routePrv.paymentRoutes.routes(this.app);
    this.routePrv.providerRoutes.routes(this.app);
    this.routePrv.returnsRoutes.routes(this.app);
    this.routePrv.warrantyRoutes.routes(this.app);

    // --- AUTORIZACIÓN Y SEGURIDAD ---
    this.routePrv.userRoutes.routes(this.app);
    this.routePrv.authRoutes.routes(this.app);
    this.routePrv.roleRoutes.routes(this.app);
    this.routePrv.roleUserRoutes.routes(this.app);
    this.routePrv.resourceRoutes.routes(this.app);
    this.routePrv.resourceRoleRoutes.routes(this.app);
    this.routePrv.refreshTokenRoutes.routes(this.app);
  }

  // ==============================
  // CONEXIÓN A LA BASE DE DATOS
  // ==============================
  private async dbConnection(): Promise<void> {
    try {
      // Mostrar información del motor de base de datos
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()} (${dbInfo.database})`);

      // Probar la conexión antes de sincronizar
      const isConnected = await testConnection();

      if (!isConnected) {
        throw new Error(`❌ No se pudo establecer conexión con ${dbInfo.engine.toUpperCase()}`);
      }

      // Sincronizar sin eliminar datos previos
      await sequelize.sync({ force: false });
      console.log("📦 Base de datos sincronizada correctamente ✅");

    } catch (error) {
      console.error("🚨 Error al conectar con la base de datos:", error);
      process.exit(1); // Termina el proceso si no hay conexión
    }
  }

  // ==============================
  // INICIAR SERVIDOR
  // ==============================
  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get("port")} ✅`);
  }

  // ==============================
  // MIDDLEWARE DE AUDITORÍA DE RESPUESTAS
  // ==============================
  private responseLogger() {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const oldSend = res.send;
      res.send = function (body?: any): express.Response {
        console.log(`[AUDITORÍA] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        return oldSend.call(this, body);
      };
      next();
    };
  }
}
