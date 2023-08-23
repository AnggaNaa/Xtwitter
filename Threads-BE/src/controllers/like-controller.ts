import { Request, Response } from "express";
import likeServices from "../services/like-services";

class LikesController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await likeServices.create(req.body, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: "Error while creating like" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const threadId = parseInt(req.params.thread_id);

      const response = await likeServices.delete(threadId, loginSession);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: "Error while deleting like" });
    }
  }
}

export default new LikesController();
