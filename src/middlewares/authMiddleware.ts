import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Verifica se a requisicao tem um token JWT valido
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token nao informado" });
    return;
  }

  // O header vem no formato "Bearer <token>"
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Formato do token invalido" });
    return;
  }

  try {
    const payload = verifyToken(token);

    // Guarda os dados do usuario para as proximas etapas da requisicao
    req.user = { id: payload.id, role: payload.role };

    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expirado" });
      return;
    }

    res.status(401).json({ message: "Token invalido" });
  }
}
