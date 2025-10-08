/**
 * Archivo: src/middleware/auth.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 07/10/2025
 * Descripción: Middleware que valida el acceso mediante JWT y roles autorizados.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/authorization/RefreshToken";
import { User } from "../models/authorization/User";
import { Role } from "../models/authorization/Role";
import { Resource } from "../models/authorization/Resource";
import { ResourceRole } from "../models/authorization/ResourceRole";
import { RoleUser } from "../models/authorization/RoleUser";
import { pathToRegexp } from "path-to-regexp";

// Middleware principal
/* export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const currentRoute = req.originalUrl;
  const currentMethod = req.method;

  if (!token) {
    res.status(401).json({ error: "Acceso denegado: No se proporcionó el token." });
    return;
  }

  try {
    // Verificar el token principal
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as jwt.JwtPayload;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { id: decoded.id, is_active: "ACTIVE" } });
    if (!user) {
      res.status(401).json({ error: "Usuario no encontrado o inactivo." });
      return;
    }

    // Validar permisos (rol ↔ recurso)
    const isAuthorized = await validateAuthorization(decoded.id, currentRoute, currentMethod);
    if (!isAuthorized) {
      res.status(403).json({ error: "No tiene permisos para acceder a esta ruta." });
      return;
    }

    next();
  } catch (error: any) {
    res.status(401).json({ error: "Token inválido o expirado.", details: error.message });
  }
}; */

export const authMiddleware = (req: any, res: any, next: any) => {
  console.log("⚠️ authMiddleware desactivado temporalmente (modo desarrollo)");
  next();
};


// Función auxiliar para validar permisos
export const validateAuthorization = async (
  userId: number,
  resourcePath: string,
  resourceMethod: string
): Promise<boolean> => {
  try {
    const resources = await Resource.findAll({
      where: { method: resourceMethod, is_active: "ACTIVE" },
    });

    // Verificar coincidencia entre rutas
const matchingResource = resources.find((r) => {
  const { regexp } = pathToRegexp(r.path);
  return regexp.test(resourcePath);
  });


    // Validar relación rol ↔ usuario ↔ recurso
    const resourceRole = await ResourceRole.findOne({
      include: [
        {
          model: Role,
          include: [
            {
              model: RoleUser,
              where: { user_id: userId, is_active: "ACTIVE" },
            },
          ],
          where: { is_active: "ACTIVE" },
        },
      ],
      where: { resource_id: matchingResource, is_active: "ACTIVE" },
    });

    return !!resourceRole;
  } catch (error) {
    console.error("Error validando autorización:", error);
    return false;
  }
};
