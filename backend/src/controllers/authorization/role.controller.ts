/**
 * Archivo: src/controllers/role.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador para la gestión de roles de usuario dentro del sistema.
 */

import { Request, Response } from "express";
import { Role } from "../../models/authorization/Role";

export class RoleController {
  public async getAll(req: Request, res: Response) {
    try {
      const roles = await Role.findAll({ where: { is_active: "ACTIVE" } });
      res.status(200).json({ roles });
    } catch {
      res.status(500).json({ error: "Error al obtener los roles" });
    }
  }

  public async create(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
      const role = await Role.create({ name, description });
      res.status(201).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, is_active } = req.body;
    try {
      const role = await Role.findByPk(id);
      if (!role) return res.status(404).json({ error: "Rol no encontrado" });
      await role.update({ name, description, is_active });
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role) return res.status(404).json({ error: "Rol no encontrado" });
      await role.destroy();
      res.status(200).json({ message: "Rol eliminado correctamente" });
    } catch {
      res.status(500).json({ error: "Error al eliminar el rol" });
    }
  }
}
