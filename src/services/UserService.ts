import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { AppError } from "../utils/AppError";

// Regras de negocio relacionadas aos dados do usuario
export class UserService {
  private readonly userRepository = UserRepository;

  // Busca um usuario pelo id, usado no endpoint de perfil
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new AppError("Usuario nao encontrado", 404);
    }

    return user;
  }
}
