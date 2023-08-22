import { Request, Response } from "express";
import replieServices from "../services/replie-services";

class RepliesController {
  async find(req: Request, res: Response) {
    try {
      const response = await replieServices.find(req.query);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting replies" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await replieServices.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: "Error while creating replies" });
    }
  }
}

export default new RepliesController();
