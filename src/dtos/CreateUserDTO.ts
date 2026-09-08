import { UserRole } from "../entities/User";

// Dados esperados no cadastro de um novo usuario
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
