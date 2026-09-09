import { Router } from "express";
import { UserController } from "../controllers/UserController";

const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/register", (req, res, next) =>
  userController.register(req, res, next)
);
authRoutes.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);

export default authRoutes;
