import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/Thread";

class ThreadServices {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const threads = await this.threadRepository.find({
        relations: ["user"],
      });
      return res.status(200).json(threads);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const thread = await this.threadRepository.findOne({
      where: {
        id: id,
      },
      relations: ["user"],
    });
    return res.status(200).json(thread);
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const thread = this.threadRepository.create({
      content: data.content,
      image: data.image,
    });
    const createThread = this.threadRepository.save(thread);
    return res.status(200).json(createThread);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deleteThread = await this.threadRepository.delete(id);
    return res.status(200).json(deleteThread);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { content, image } = req.body;
    const thread = await this.threadRepository.findOne({
      where: {
        id: id,
      },
    });

    thread.content = content;
    thread.image = image;

    const updateThread = await this.threadRepository.save(thread);

    return res.status(200).json(updateThread);
  }
}

export default new ThreadServices();
