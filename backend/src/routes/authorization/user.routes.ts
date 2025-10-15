/**
 * Archivo: src/routes/authorization/user.routes.ts
 * Autor: Karyn Movil Estacio
 * Fecha: 14/10/2025
 * Descripción: Rutas para la gestión de usuarios del sistema Rentool.
 */

import { Application } from "express";
import { UserController } from "../../controllers/authorization/user.controller";

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/users")
      .get(this.userController.getAllUsers)
      .post(this.userController.createUser);

    app.route("/api/users/:id")
      .get(this.userController.getUserById)
      .patch(this.userController.updateUser)
      .delete(this.userController.deleteUser);

    app.route("/api/users/:id/logic")
      .delete(this.userController.deleteUserAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // (agregar authMiddleware cuando se requiera proteger las rutas)
  }
}
