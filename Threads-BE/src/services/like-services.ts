import { Request, Response } from "express";
import { Likes } from "../entities/Like";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

class ThreadServices {
  private readonly likeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const thread = await this.likeRepository.findOne({
      where: {
        id: id,
      },
      relations: ["threads"],
    });
    return res.status(200).json(thread);
  }
}
