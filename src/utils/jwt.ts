import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../entities/User";

// Informacoes que ficam guardadas dentro do token
export interface TokenPayload {
  id: string;
  role: UserRole;
}

// Le a chave secreta do .env e avisa se ela nao foi configurada
function getSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET nao foi configurado no arquivo .env");
  }

  return secret;
}

// Gera o token JWT no login
export function generateToken(payload: TokenPayload): string {
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  } as SignOptions;

  return jwt.sign(payload, getSecret(), options);
}

// Valida o token e devolve os dados do usuario
export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, getSecret()) as TokenPayload;
}
