import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../utils/AppError";

const userService = new UserService();

export class UserController {
  // POST /auth/register
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role } = req.body;

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
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // POST /auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const token = await userService.login({ email, password });

      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  // GET /users/me
  async me(req: Request, res: Response): Promise<void> {
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
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
