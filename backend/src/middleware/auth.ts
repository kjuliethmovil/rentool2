/**
 * Archivo: src/middleware/auth.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 15/10/2025
 * Descripción: Middleware para proteger rutas mediante validación JWT en Rentool.
 *               Verifica la validez del token, el estado del usuario y permite acceso
 *               únicamente a usuarios autenticados y activos.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/authorization/User";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Extraer el token del encabezado Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const currentRoute = req.originalUrl;
  const currentMethod = req.method;

  // Mostrar en consola la ruta y método que se intenta acceder (útil para depurar)
  console.log(`🔐 Intentando acceder a: [${currentMethod}] ${currentRoute}`);

  // Si no se proporciona token
  if (!token) {
    res.status(401).json({
      error: "Acceso denegado: No se proporcionó el token principal.",
    });
    return;
  }

  try {
    // Verificar validez del token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "RentoolSecretKey"
    ) as jwt.JwtPayload;

    // Verificar si el usuario asociado al token existe y está activo
    const user = await User.findOne({
      where: { id: decoded.id, is_active: "ACTIVE" },
    });

    if (!user) {
      res.status(401).json({
        error: "Usuario no encontrado o inactivo.",
      });
      return;
    }

    // Si todo es correcto, agregamos el usuario al request
    (req as any).user = user;

    // Continuar al siguiente middleware o controlador
    next();
  } catch (error: any) {
    // Manejo detallado de errores JWT
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "El token ha expirado." });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "El token es inválido o corrupto." });
    } else {
      res.status(500).json({
        error: "Error interno al procesar la autenticación.",
        details: error.message,
      });
    }
  }
};
