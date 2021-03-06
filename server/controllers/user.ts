import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user";
import {
  UserBody,
  LoginBody,
  UpdateImageBody,
  UpdateUserLabelsBody,
} from "../types";

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

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    // await imageService.getAllImages({ req, res, next });
    const body: LoginBody = req.body;
    await userService.login({ req, res, next }, body);
  }

  async updateImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await userService.updateImage({ req, res, next }, body);
  }

  async addCreateCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await userService.addCreateCredit({ req, res, next }, body);
  }

  async addReviewCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await userService.addReviewCredit({ req, res, next }, body);
  }

  async addValidateCredit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateImageBody = req.body;
    await userService.addValidateCredit({ req, res, next }, body);
  }

  async addNumberByType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body: UpdateUserLabelsBody = req.body;
    await userService.addNumberByType({ req, res, next }, body);
  }
}
