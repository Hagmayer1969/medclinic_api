import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { toUserResponse, UserResponseDTO } from "../dtos/UserResponseDTO";

export class UserController {
  private readonly userService = new UserService();

  // GET /users/me
  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // O authMiddleware ja validou o token e preencheu o req.user
      const userId = req.user!.id;

      const user = await this.userService.findById(userId);

      const resposta: UserResponseDTO = toUserResponse(user);

      res.status(200).json(resposta);
    } catch (error) {
      next(error);
    }
  }
}
