import { User, UserRole } from "../entities/User";

// Formato de saida dos dados de usuario na API.
// Garante que a senha nunca seja devolvida na resposta.
export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// Converte a entidade do banco para o formato de resposta da API
export function toUserResponse(user: User): UserResponseDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}
