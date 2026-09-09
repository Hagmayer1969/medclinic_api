import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import { AppError } from "../utils/AppError";

// Libera a rota apenas para os perfis informados.
// Deve ser usado sempre depois do authMiddleware.
export function checkRole(rolesPermitidos: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError("Usuario nao autenticado", 401));
      return;
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      next(
        new AppError(
          "Acesso negado. Voce nao tem permissao para este recurso",
          403
        )
      );
      return;
    }

    next();
  };
}
