/**
 * Archivo: src/controllers/auth.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Controlador de autenticación y manejo de tokens (login, registro, refresh).
 */

import { Request, Response } from "express";
import { User } from "../models/authorization/User";
import { RefreshToken } from "../models/authorization/RefreshToken";

export class AuthController {
  // Registro de usuario
  public async register(req: Request, res: Response) {
    const { username, email, password, avatar } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
        avatar,
        is_active: "ACTIVE",
      });
      res.status(201).json({ message: "Usuario creado con éxito", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Inicio de sesión
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email, is_active: "ACTIVE" } });
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const validPassword = await user.checkPassword(password);
      if (!validPassword)
        return res.status(401).json({ error: "Contraseña incorrecta" });

      // Generar tokens
      const accessToken = user.generateToken();
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();

      // Guardar refresh token
      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        device_info: req.headers["user-agent"] || "unknown",
        is_valid: true,
        expires_at: expiresAt,
      });

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Refrescar el token de acceso
  public async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const tokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken, is_valid: true },
      });

      if (!tokenRecord)
        return res.status(401).json({ error: "Token inválido o expirado" });

      const user = await User.findByPk(tokenRecord.user_id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const newAccessToken = user.generateToken();

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error: any) {
      res.status(500).json({ error: "Error al refrescar el token", details: error.message });
    }
  }

  // Cerrar sesión (invalidar token)
  public async logout(req: Request, res: Response) {
    const { refreshToken } = req.body;

    try {
      const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });
      if (tokenRecord) {
        await tokenRecord.update({ is_valid: false });
      }
      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error: any) {
      res.status(500).json({ error: "Error al cerrar sesión", details: error.message });
    }
  }
}
