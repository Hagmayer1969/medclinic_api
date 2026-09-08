import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User, UserRole } from "../entities/User";
import { isValidEmail } from "../utils/validators";
import { AppError } from "../utils/AppError";

export class UserService {
  // Cadastra um novo usuario no sistema
  async create(data: CreateUserDTO): Promise<User> {
    const { name, email, password, role } = data;

    if (!name || !email || !password) {
      throw new AppError("Nome, e-mail e senha sao obrigatorios", 400);
    }

    if (!isValidEmail(email)) {
      throw new AppError("E-mail invalido", 400);
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no minimo 6 caracteres", 400);
    }

    if (role && !Object.values(UserRole).includes(role)) {
      throw new AppError("Perfil invalido. Use Administrador ou Atendente", 400);
    }

    const emailJaCadastrado = await UserRepository.findOneBy({ email });

    if (emailJaCadastrado) {
      throw new AppError("E-mail ja cadastrado", 409);
    }

    const user = UserRepository.create({
      name,
      email,
      password,
      role: role || UserRole.ATENDENTE,
    });

    await UserRepository.save(user);

    return user;
  }
}
