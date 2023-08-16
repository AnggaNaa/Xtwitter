import { Request, Response } from "express";
import AuthServices from "../services/auth-servicesFAILED";
import tes from "../services/auth-services";
import authServices from "../services/auth-services";

class LoginController {
  findOne(req: Request, res: Response) {
    authServices.findOne(req, res);
  }

  check(req: Request, res: Response) {
    authServices.check(req, res);
  }
}

export default new LoginController();
