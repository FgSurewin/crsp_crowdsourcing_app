import { SECRET } from "./../database/index";
import { LoginBody, UpdateImageBody } from "./../types/index";
import { AppContext, UserBody } from "../types";
import UserModel, { UserInterface } from "../database/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Bcrypt Configuration
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export class UserService {
  async addUser(ctx: AppContext, body: UserBody) {
    const { res } = ctx;
    const { email, password } = body;
    try {
      const result: UserInterface[] = await UserModel.find({ email });
      if (result.length === 0) {
        const encodePassword = bcrypt.hashSync(password, salt);
        const newUser = {
          ...body,
          password: encodePassword,
          isSent: false,
          isReviewed: false,
          images: 0,
        };
        await UserModel.create(newUser);
        res.json({
          code: 0,
          message: "Sign Up Successfully!",
          data: result,
        });
      } else {
        res.json({
          code: 2000,
          message: "Email has been registered.",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(e);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }

  async updateImage(ctx: AppContext, body: UpdateImageBody) {
    const { res } = ctx;
    const { number, id } = body;
    try {
      const result: UserInterface | null = await UserModel.findOne({
        _id: id,
      });
      if (result) {
        const { ok } = await UserModel.updateOne(
          { _id: id },
          { images: result.images + number }
        );
        if (ok === 1) {
          res.json({
            code: 0,
            message: "Label Successfully",
            data: result,
          });
        } else {
          res.json({
            code: 4000,
            message: "Label failed",
          });
        }
      } else {
        res.json({
          code: 2000,
          message: "User doesn't exist!",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(e);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }

  async login(ctx: AppContext, body: LoginBody) {
    const { res } = ctx;
    const { email, password } = body;
    try {
      const result: UserInterface[] = await UserModel.find({ email });
      // Check if the user exists
      if (result.length !== 0) {
        const user: UserInterface = result[0];
        const validPass = await bcrypt.compare(password, user.password);
        // Check if the password corrects
        if (validPass) {
          // res.status(400).send("Invalid password");
          if (result[0].isReviewed) {
            const token = jwt.sign(
              {
                id: result[0]._id,
              },
              SECRET!,
              { expiresIn: 60 * 60 * 3 }
            );
            res.json({
              code: 0,
              message: "Login Successfully",
              data: { token, nickname: result[0].nickname, id: result[0]._id },
            });
          } else {
            res.json({
              code: 2000,
              message: "Account review in progress",
            });
          }
        } else {
          res.json({
            code: 2000,
            message: "Password is not correct .",
            data: result,
          });
        }
      } else {
        res.json({
          code: 2000,
          message: "Email doesn't exist.",
          data: result,
        });
      }
    } catch (e) {
      const error = new Error(e);
      res.json({
        code: 5000,
        message: error.message,
      });
    }
  }
}