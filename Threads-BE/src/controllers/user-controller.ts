import { Request, Response } from "express";
import UserServices from "../services/user-services";

class UserController {
  find(req: Request, res: Response) {
    UserServices.find(req, res);
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
