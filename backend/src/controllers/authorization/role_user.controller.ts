/**
 * Archivo: src/controllers/authorization/role_user.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Controlador CRUD para la relación Usuario-Rol.
 */

import { Request, Response } from "express";
import { RoleUser, RoleUserI } from "../../models/authorization/RoleUser";

export class RoleUserController {
  public async getAllRoleUsers(req: Request, res: Response): Promise<void> {
    try {
      const roleUsers: RoleUserI[] = await RoleUser.findAll({ where: { is_active: "ACTIVE" } });
      res.status(200).json({ roleUsers });
    } catch {
      res.status(500).json({ error: "Error al obtener las asignaciones" });
    }
  }

  public async getRoleUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) res.status(200).json(roleUser);
      else res.status(404).json({ error: "Asignación no encontrada" });
    } catch {
      res.status(500).json({ error: "Error al obtener la asignación" });
    }
  }

  public async createRoleUser(req: Request, res: Response): Promise<void> {
    const { user_id, role_id } = req.body;
    try {
      const newRoleUser = await RoleUser.create({ user_id, role_id, is_active: "ACTIVE" });
      res.status(201).json(newRoleUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateRoleUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { user_id, role_id, is_active } = req.body;
    try {
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) {
        await roleUser.update({ user_id, role_id, is_active });
        res.status(200).json(roleUser);
      } else res.status(404).json({ error: "Asignación no encontrada o inactiva" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteRoleUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const roleUser = await RoleUser.findByPk(id);
      if (roleUser) {
        await roleUser.destroy();
        res.status(200).json({ message: "Asignación eliminada correctamente" });
      } else res.status(404).json({ error: "Asignación no encontrada" });
    } catch {
      res.status(500).json({ error: "Error al eliminar la asignación" });
    }
  }

  public async deleteRoleUserAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const roleUser = await RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
      if (roleUser) {
        await roleUser.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: "Asignación desactivada correctamente" });
      } else res.status(404).json({ error: "Asignación no encontrada" });
    } catch {
      res.status(500).json({ error: "Error al desactivar la asignación" });
    }
  }
}
