import { Router } from "express";
const Router = Router();

Router.get("/Login", authController.getLogin);
Router.get("/Register", authController.getRegister);