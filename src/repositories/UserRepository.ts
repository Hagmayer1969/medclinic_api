import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

// Repositorio do TypeORM responsavel pelo acesso a tabela users
export const UserRepository = AppDataSource.getRepository(User);
