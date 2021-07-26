import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user";
import { UserBody, LoginBody, UpdateImageBody } from "../types";

const userService = new UserService();

export class UserController {
  async addUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // await imageService.getAllImages({ req, res, next });
    const body: UserBody = req.body;
    await userService.addUser({ req, res, next }, body);
  }

  async updateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await userService.updateImage({ req, res, next }, body);
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    // await imageService.getAllImages({ req, res, next });
    const body: LoginBody = req.body;
    await userService.login({ req, res, next }, body);
  }
}
