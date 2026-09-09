import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { toUserResponse, UserResponseDTO } from "../dtos/UserResponseDTO";
import { LoginResponseDTO } from "../dtos/LoginResponseDTO";

export class AuthController {
  private readonly authService = new AuthService();

  // POST /auth/register
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Se o corpo nao vier, o service devolve o erro de campos obrigatorios
      const { name, email, password, role } = req.body ?? {};

      const user = await this.authService.register({
        name,
        email,
        password,
        role,
      });

      const resposta: UserResponseDTO = toUserResponse(user);

      res.status(201).json(resposta);
    } catch (error) {
      // Repassa o erro para o middleware central
      next(error);
    }
  }

  // POST /auth/login
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body ?? {};

      const token = await this.authService.login({ email, password });

      const resposta: LoginResponseDTO = { token };

      res.status(200).json(resposta);
    } catch (error) {
      next(error);
    }
  }
}
