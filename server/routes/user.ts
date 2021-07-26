import express from "express";
import { UserController } from "../controllers/user";
const route = express.Router();
const userController = new UserController();

// route.get("/test", imageController.test);

route.post("/addUser", userController.addUser);
route.post("/login", userController.login);
route.post("/addImages", userController.updateImage);

export default route;
