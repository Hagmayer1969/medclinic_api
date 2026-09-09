import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkRole } from "../middlewares/roleMiddleware";
import { UserRole } from "../entities/User";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.get(
  "/ping",
  authMiddleware,
  checkRole([UserRole.ADMINISTRADOR]),
  (req, res) => adminController.ping(req, res)
);

export default adminRoutes;
