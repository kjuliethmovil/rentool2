/**
 * Archivo: src/middleware/auth.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Middleware que valida el acceso mediante JWT y roles autorizados.
 */


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/authorization/User";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Acceso denegado: No se proporcionó el token." });
    return;
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as jwt.JwtPayload;

    // Verificar si el usuario existe y está activo
    const user = await User.findOne({ where: { id: decoded.id, is_active: "ACTIVE" } });
    if (!user) {
      res.status(401).json({ error: "Usuario no encontrado o inactivo." });
      return;
    }

    // Guardar usuario en request
    (req as any).user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ error: "Token inválido o expirado.", details: error.message });
  }
};
