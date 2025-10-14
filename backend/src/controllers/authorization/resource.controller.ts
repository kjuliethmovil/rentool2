/**
 * Archivo: src/controllers/resource.controller.ts
 * Autor: Karyn Movil Estacio
 * Descripción: Controlador para gestionar los recursos (Resources).
 */

import { Request, Response } from "express";

export class ResourceController {
  public async getAllResources(req: Request, res: Response): Promise<void> {
    try {
      // Ejemplo temporal
      res.json({ message: "Listado de recursos" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener recursos", error });
    }
  }

  public async createResource(req: Request, res: Response): Promise<void> {
    try {
      const { name, type } = req.body;
      // Lógica para crear el recurso...
      res.status(201).json({ message: "Recurso creado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el recurso", error });
    }
  }
}
