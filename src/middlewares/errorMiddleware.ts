import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

// Middleware central de tratamento de erros.
// Deve ser registrado por ultimo no server.ts.
export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Erros previstos pela aplicacao (validacao, conflito, permissao...)
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  // Corpo da requisicao enviado com JSON malformado
  if (error instanceof SyntaxError && "body" in error) {
    res.status(400).json({ message: "JSON invalido no corpo da requisicao" });
    return;
  }

  // Erro inesperado: registra no servidor e devolve uma resposta generica,
  // sem expor detalhes internos para quem chamou a API
  console.error("Erro inesperado:", error);

  res.status(500).json({ message: "Erro interno do servidor" });
}
