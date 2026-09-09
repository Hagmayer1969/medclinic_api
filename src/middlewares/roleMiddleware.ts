import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";

// Libera a rota apenas para os perfis informados.
// Deve ser usado sempre depois do authMiddleware.
export function checkRole(rolesPermitidos: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Usuario nao autenticado" });
      return;
    }

    if (!rolesPermitidos.includes(req.user.role)) {
      res.status(403).json({
        message: "Acesso negado. Voce nao tem permissao para este recurso",
      });
      return;
    }

    next();
  };
}
