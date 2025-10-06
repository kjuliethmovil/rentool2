/**
 * Archivo: src/config/index.ts
 * Autor: Karyn Movil Estacio
 * Descripción: Configuración principal de la aplicación Express.
 */

import express, { Application } from "express";
import morgan from "morgan";

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
  }

  // Configuración de la aplicación
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  // Configuración de middlewares
  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json()); // leer JSON raw
    this.app.use(express.urlencoded({ extended: false })); // leer formularios
  }

  // Iniciar servidor
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('✅ Server on port', this.app.get('port'));
  }
}
