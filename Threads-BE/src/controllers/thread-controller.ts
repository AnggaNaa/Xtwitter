import { Request, Response } from "express";
import ThreadServices from "../services/thread-services";

class ThreadsController {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.find(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ini erorr", error);
      return res
        .status(500)
        .json({ error: "Error while getting find threads controller" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.findOne(id, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      console.log("ini erorr baris 27", error);
      return res
        .status(500)
        .json({ error: "Error while getting findOne threads controller" });
    }
  }

  // create(req: Request, res: Response) {
  //   ThreadServices.create(req, res);
  // }

  // delete(req: Request, res: Response) {
  //   ThreadServices.delete(req, res);
  // }

  // update(req: Request, res: Response) {
  //   ThreadServices.update(req, res);
  // }
}

export default new ThreadsController();
