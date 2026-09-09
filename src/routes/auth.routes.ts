import { Router } from "express";
import { UserController } from "../controllers/UserController";

const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/register", (req, res) => userController.register(req, res));
authRoutes.post("/login", (req, res) => userController.login(req, res));

export default authRoutes;
