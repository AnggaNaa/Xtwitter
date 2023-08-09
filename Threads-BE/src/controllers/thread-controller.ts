import { Request, Response } from "express";
import ThreadServices from "../services/thread-services";

class ThreadsController {
  find(req: Request, res: Response) {
    ThreadServices.find(req, res);
  }

  findOne(req: Request, res: Response) {
    ThreadServices.findOne(req, res);
  }

  create(req: Request, res: Response) {
    ThreadServices.create(req, res);
  }

  delete(req: Request, res: Response) {
    ThreadServices.delete(req, res);
  }

  update(req: Request, res: Response) {
    ThreadServices.update(req, res);
  }
}

export default new ThreadsController();
