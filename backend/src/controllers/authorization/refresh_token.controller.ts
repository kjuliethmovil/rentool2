/**
 * Archivo: src/controllers/authorization/refresh_token.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Controlador CRUD para la gestión de Refresh Tokens (autenticación segura).
 */

import { Request, Response } from "express";
import { RefreshToken, RefreshTokenI } from "../../models/authorization/RefreshToken";
import { User } from "../../models/authorization/User";

export class RefreshTokenController {
  // Obtener todos los refresh tokens
  public async getAllRefreshTokens(req: Request, res: Response): Promise<void> {
    try {
      const tokens: RefreshTokenI[] = await RefreshToken.findAll({
        include: [{ model: User, attributes: ["id", "username", "email"] }],
      });
      res.status(200).json({ tokens });
    } catch {
      res.status(500).json({ error: "Error al obtener los refresh tokens" });
    }
  }

  // Obtener refresh token por ID
  public async getRefreshTokenById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const token = await RefreshToken.findByPk(id, {
        include: [{ model: User, attributes: ["id", "username", "email"] }],
      });
      if (token) res.status(200).json(token);
      else res.status(404).json({ error: "Refresh token no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al obtener el refresh token" });
    }
  }

  // Crear refresh token
  public async createRefreshToken(req: Request, res: Response): Promise<void> {
    const { user_id, token, device_info, expires_at } = req.body;
    try {
      const newToken = await RefreshToken.create({
        user_id,
        token,
        device_info,
        expires_at,
        is_valid: true,
      });
      res.status(201).json(newToken);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar refresh token
  public async updateRefreshToken(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { device_info, is_valid, expires_at } = req.body;
    try {
      const token = await RefreshToken.findByPk(id);
      if (token) {
        await token.update({ device_info, is_valid, expires_at });
        res.status(200).json(token);
      } else res.status(404).json({ error: "Refresh token no encontrado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar refresh token físicamente
  public async deleteRefreshToken(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const token = await RefreshToken.findByPk(id);
      if (token) {
        await token.destroy();
        res.status(200).json({ message: "Refresh token eliminado correctamente" });
      } else res.status(404).json({ error: "Refresh token no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar el refresh token" });
    }
  }

  // Invalidar refresh token (eliminación lógica)
  public async invalidateRefreshToken(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const token = await RefreshToken.findByPk(id);
      if (token) {
        await token.update({ is_valid: false });
        res.status(200).json({ message: "Refresh token invalidado correctamente" });
      } else res.status(404).json({ error: "Refresh token no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al invalidar el refresh token" });
    }
  }
}
