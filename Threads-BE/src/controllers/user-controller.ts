import { Request, Response } from "express";
import UserServices from "../services/user-services";

class UserController {
  // async findOne(req: Request, res: Response) {
  //   try {
  //     const loginSession = res.locals.loginSession;
  //     const response = await UserServices.findOne(loginSession);
  //     return res.status(200).json(response);
  //   } catch (error) {
  //     return res.status(500).json({ error: "Error while getting user" });
  //   }
  // }

  find(req: Request, res: Response) {
    UserServices.searchByName(req, res);
  }

  findOne(req: Request, res: Response) {
    UserServices.findOne(req, res);
  }

  create(req: Request, res: Response) {
    UserServices.create(req, res);
  }

  delete(req: Request, res: Response) {
    UserServices.delete(req, res);
  }

  update(req: Request, res: Response) {
    UserServices.update(req, res);
  }
}

export default new UserController();
