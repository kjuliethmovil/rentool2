/**
 * Archivo: src/controllers/authorization/auth.controller.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 15/10/2025
 * Descripción: Controlador encargado del registro, inicio de sesión y gestión de tokens JWT en Rentool.
 */

import { Request, Response } from "express";
import { User } from "../../models/authorization/User";
import { RefreshToken } from "../../models/authorization/RefreshToken";

export class AuthController {
  /**
   * Registro de nuevo usuario en el sistema
   */
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, avatar } = req.body;

      // Crear usuario en base de datos
      const newUser = await User.create({
        username,
        email,
        password,
        avatar,
        is_active: "ACTIVE",
      });

      // Generar token principal JWT
      const accessToken = newUser.generateToken();

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        accessToken,
      });
    } catch (error: any) {
      console.error("❌ Error al registrar:", error);
      res.status(500).json({
        error: "Error al registrar el usuario",
        details: error.message,
      });
    }
  }

  /**
   * Inicio de sesión
   */
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Buscar usuario activo por email
      const user = await User.findOne({ where: { email, is_active: "ACTIVE" } });
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado o inactivo" });
        return;
      }

      // Verificar contraseña
      const validPassword = await user.checkPassword(password);
      if (!validPassword) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      // Generar tokens
      const accessToken = user.generateToken();
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();

      // Guardar refresh token en la BD
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
      console.error("❌ Error al iniciar sesión:", error);
      res.status(500).json({
        error: "Error interno al iniciar sesión",
        details: error.message,
      });
    }
  }

  /**
   * Refrescar el token de acceso usando refresh token válido
   */
  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken, is_valid: true },
      });

      if (!storedToken) {
        res.status(401).json({ error: "Token inválido o expirado" });
        return;
      }

      const user = await User.findByPk(storedToken.user_id);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      const newAccessToken = user.generateToken();

      res.status(200).json({
        message: "Token renovado correctamente",
        accessToken: newAccessToken,
      });
    } catch (error: any) {
      console.error("❌ Error al refrescar token:", error);
      res.status(500).json({
        error: "Error al refrescar token",
        details: error.message,
      });
    }
  }

  /**
   * Cerrar sesión (invalidar refresh token)
   */
  public async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      const tokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken },
      });

      if (tokenRecord) {
        await tokenRecord.update({ is_valid: false });
      }

      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error: any) {
      console.error("❌ Error al cerrar sesión:", error);
      res.status(500).json({
        error: "Error al cerrar sesión",
        details: error.message,
      });
    }
  }
}
