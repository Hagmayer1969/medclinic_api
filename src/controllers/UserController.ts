import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  // POST /auth/register
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Se o corpo nao vier, o service devolve o erro de campos obrigatorios
      const { name, email, password, role } = req.body ?? {};

      const user = await userService.create({ name, email, password, role });

      // Nunca devolvemos a senha na resposta
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      // Repassa o erro para o middleware central
      next(error);
    }
  }

  // POST /auth/login
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body ?? {};

      const token = await userService.login({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  // GET /users/me
  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // O authMiddleware ja validou o token e preencheu o req.user
      const userId = req.user!.id;

      const user = await userService.findById(userId);

      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      next(error);
    }
  }
}
