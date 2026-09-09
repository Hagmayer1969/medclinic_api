import { Request, Response } from "express";

export class AdminController {
  // GET /admin/ping
  // Rota usada apenas para confirmar que o perfil Administrador tem acesso
  async ping(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      message: "Acesso liberado para o perfil Administrador",
      userId: req.user!.id,
      role: req.user!.role,
    });
  }
}
