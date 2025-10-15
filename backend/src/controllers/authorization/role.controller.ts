/**
 * Archivo: src/controllers/authorization/role.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Controlador CRUD para roles del sistema.
 */

import { Request, Response } from "express";
import { Role, RoleI } from "../../models/authorization/Role";

export class RoleController {
  // Obtener todos los roles
  public async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles: RoleI[] = await Role.findAll({ where: { is_active: "ACTIVE" } });
      res.status(200).json({ roles });
    } catch {
      res.status(500).json({ error: "Error al obtener los roles" });
    }
  }

  // Obtener rol por ID
  public async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const role = await Role.findOne({ where: { id, is_active: "ACTIVE" } });
      if (role) res.status(200).json(role);
      else res.status(404).json({ error: "Rol no encontrado o inactivo" });
    } catch {
      res.status(500).json({ error: "Error al obtener el rol" });
    }
  }

  // Crear rol
  public async createRole(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;
    try {
      const newRole = await Role.create({ name, description, is_active: "ACTIVE" });
      res.status(201).json(newRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar rol
  public async updateRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description, is_active } = req.body;
    try {
      const role = await Role.findOne({ where: { id, is_active: "ACTIVE" } });
      if (role) {
        await role.update({ name, description, is_active });
        res.status(200).json(role);
      } else res.status(404).json({ error: "Rol no encontrado o inactivo" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar físicamente
  public async deleteRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (role) {
        await role.destroy();
        res.status(200).json({ message: "Rol eliminado correctamente" });
      } else res.status(404).json({ error: "Rol no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar el rol" });
    }
  }

  // Eliminar lógicamente
  public async deleteRoleAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const role = await Role.findOne({ where: { id, is_active: "ACTIVE" } });
      if (role) {
        await role.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: "Rol desactivado correctamente" });
      } else res.status(404).json({ error: "Rol no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al desactivar el rol" });
    }
  }
}
