import { Request, Response } from "express";

// Responde em JSON quando a rota solicitada nao existe
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({ message: "Rota nao encontrada" });
}
