import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

// Verifica se a requisicao tem um token JWT valido.
// Os erros sao repassados para o middleware central de tratamento de erros.
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new AppError("Token nao informado", 401));
    return;
  }

  // O header vem no formato "Bearer <token>"
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    next(new AppError("Formato do token invalido", 401));
    return;
  }

  try {
    const payload = verifyToken(token);

    // Guarda os dados do usuario para as proximas etapas da requisicao
    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      next(new AppError("Token expirado", 401));
      return;
    }

    next(new AppError("Token invalido", 401));
  }
}
