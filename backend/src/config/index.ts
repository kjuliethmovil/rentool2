/**
 * Archivo: src/config/index.ts
 * Autor: Karyn Movil Estacio
 * Descripción: Configuración principal de la aplicación Express.
 */
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { sequelize } from "../database/connection";
import { Routes } from "../routes/index";
var cors = require("cors"); // install en node y types
// Load environment variables from the .env file
dotenv.config();

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(
    private port?: number | string) {
    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection(); // Call the database connection method
  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  // Middleware configuration
  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  // Route configuration
  private routes(): void {
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
  }

  // Method to connect and synchronize the database
  private async dbConnection(): Promise<void> {
    try {
      await sequelize.sync({ force: false }); // Synchronize the database
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  // Start the server
  async listen() {
      await this.app.listen(this.app.get('port'));
        // await this.app.listen(this.port);
        // console.log('Server on port', this.port);
        console.log('Server on port', this.app.get('port'));
  }
}
