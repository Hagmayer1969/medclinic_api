import { UserRepository } from "../repositories/UserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { User, UserRole } from "../entities/User";
import { isValidEmail } from "../utils/validators";
import { AppError } from "../utils/AppError";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

// Regras de negocio de cadastro e autenticacao
export class AuthService {
  private readonly userRepository = UserRepository;

  // Cadastra um novo usuario no sistema
  async register(data: CreateUserDTO): Promise<User> {
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

    const emailJaCadastrado = await this.userRepository.findOneBy({ email });

    if (emailJaCadastrado) {
      throw new AppError("E-mail ja cadastrado", 409);
    }

    const senhaCriptografada = await hashPassword(password);

    const user = this.userRepository.create({
      name,
      email,
      password: senhaCriptografada,
      role: role || UserRole.ATENDENTE,
    });

    await this.userRepository.save(user);

    return user;
  }

  // Faz o login e devolve o token de acesso
  async login(data: LoginDTO): Promise<string> {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError("E-mail e senha sao obrigatorios", 400);
    }

    const user = await this.userRepository.findOneBy({ email });

    // Mensagem generica de proposito, para nao entregar qual campo esta errado
    if (!user) {
      throw new AppError("E-mail ou senha invalidos", 401);
    }

    const senhaCorreta = await comparePassword(password, user.password);

    if (!senhaCorreta) {
      throw new AppError("E-mail ou senha invalidos", 401);
    }

    return generateToken({ id: user.id, role: user.role });
  }
}
