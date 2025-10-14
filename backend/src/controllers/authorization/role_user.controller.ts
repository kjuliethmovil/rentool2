/**
 * Archivo: src/controllers/role_user.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador que gestiona la asignación de roles a usuarios.
 */

import { Request, Response } from "express";
import { RoleUser } from "../../models/authorization/RoleUser";

export class RoleUserController {
  public async assignRole(req: Request, res: Response) {
    const { user_id, role_id } = req.body;
    try {
      const newRelation = await RoleUser.create({ user_id, role_id, is_active: "ACTIVE" });
      res.status(201).json(newRelation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const roles = await RoleUser.findAll({ where: { is_active: "ACTIVE" } });
      res.status(200).json({ roles });
    } catch {
      res.status(500).json({ error: "Error al obtener las asignaciones" });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const relation = await RoleUser.findByPk(id);
      if (!relation) return res.status(404).json({ error: "Relación no encontrada" });
      await relation.update({ is_active: "INACTIVE" });
      res.status(200).json({ message: "Rol desasignado correctamente" });
    } catch {
      res.status(500).json({ error: "Error al desasignar el rol" });
    }
  }
}
