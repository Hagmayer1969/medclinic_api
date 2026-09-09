import { UserRole } from "../entities/User";

// Adiciona o campo user na requisicao do Express,
// preenchido pelo middleware de autenticacao
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
