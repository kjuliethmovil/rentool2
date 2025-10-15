/**
 * Archivo: src/controllers/authorization/resourceRole.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Controlador CRUD para la relación entre roles y recursos (permisos).
 */

import { Request, Response } from "express";
import { ResourceRole, ResourceRoleI } from "../../models/authorization/ResourceRole";

export class ResourceRoleController {
  // Obtener todos los permisos activos
  public async getAllResourceRoles(req: Request, res: Response): Promise<void> {
    try {
      const resourceRoles: ResourceRoleI[] = await ResourceRole.findAll({
        where: { is_active: "ACTIVE" },
      });
      res.status(200).json({ resourceRoles });
    } catch {
      res.status(500).json({ error: "Error al obtener los permisos" });
    }
  }

  // Obtener permiso por ID
  public async getResourceRoleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) res.status(200).json(resourceRole);
      else res.status(404).json({ error: "Permiso no encontrado o inactivo" });
    } catch {
      res.status(500).json({ error: "Error al obtener el permiso" });
    }
  }

  // Crear permiso
  public async createResourceRole(req: Request, res: Response): Promise<void> {
    const { resource_id, role_id } = req.body;
    try {
      const newResourceRole = await ResourceRole.create({
        resource_id,
        role_id,
        is_active: "ACTIVE",
      });
      res.status(201).json(newResourceRole);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar permiso
  public async updateResourceRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { resource_id, role_id, is_active } = req.body;
    try {
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) {
        await resourceRole.update({ resource_id, role_id, is_active });
        res.status(200).json(resourceRole);
      } else res.status(404).json({ error: "Permiso no encontrado o inactivo" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar permiso físicamente
  public async deleteResourceRole(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const resourceRole = await ResourceRole.findByPk(id);
      if (resourceRole) {
        await resourceRole.destroy();
        res.status(200).json({ message: "Permiso eliminado correctamente" });
      } else res.status(404).json({ error: "Permiso no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar el permiso" });
    }
  }

  // Eliminar permiso lógicamente (inactivar)
  public async deleteResourceRoleAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const resourceRole = await ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
      if (resourceRole) {
        await resourceRole.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: "Permiso desactivado correctamente" });
      } else res.status(404).json({ error: "Permiso no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al desactivar el permiso" });
    }
  }
}
