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
}
