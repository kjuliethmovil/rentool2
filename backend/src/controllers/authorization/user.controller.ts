/**
 * Archivo: src/controllers/authorization/user.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Controlador CRUD para la gestión de usuarios del sistema.
 */

import { Request, Response } from "express";
import { User, UserI } from "../../models/authorization/User";

export class UserController {
  // Buscar todos los usuarios activos
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserI[] = await User.findAll({ where: { is_active: "ACTIVE" } });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  // Buscar usuario por ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id, is_active: "ACTIVE" } });
      if (user) res.status(200).json(user);
      else res.status(404).json({ error: "Usuario no encontrado o inactivo" });
    } catch {
      res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  // Crear usuario
  public async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatar } = req.body;
    try {
      const newUser = await User.create({ username, email, password, avatar });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar usuario
  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username, email, password, avatar, is_active } = req.body;
    try {
      const user = await User.findOne({ where: { id, is_active: "ACTIVE" } });
      if (user) {
        await user.update({ username, email, password, avatar, is_active });
        res.status(200).json(user);
      } else res.status(404).json({ error: "Usuario no encontrado o inactivo" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar usuario físicamente
  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else res.status(404).json({ error: "Usuario no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  }

  // Eliminar usuario lógicamente
  public async deleteUserAdv(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id, is_active: "ACTIVE" } });
      if (user) {
        await user.update({ is_active: "INACTIVE" });
        res.status(200).json({ message: "Usuario desactivado correctamente" });
      } else res.status(404).json({ error: "Usuario no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al desactivar el usuario" });
    }
  }
}
