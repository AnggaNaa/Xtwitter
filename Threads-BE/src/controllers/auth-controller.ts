import { Request, Response } from "express";
import AuthServices from "../services/auth-services";
import tes from "../services/tes";

class LoginController {
  findOne(req: Request, res: Response) {
    tes.findOne(req, res);
  }
}

export default new LoginController();
