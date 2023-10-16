import { Request, Response } from "express";
import { Likes } from "../entities/Like";
import { AppDataSource } from "../data-source";
import { Like, Repository } from "typeorm";
import { threadId } from "worker_threads";

class LikesServices {
  private readonly likeRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  // async findOne(req: Request, res: Response) {
  //   const id = parseInt(req.params.id);
  //   const thread = await this.likeRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //     relations: ["threads"],
  //   });
  //   return res.status(200).json(thread);
  // }

  async create(reqBody: any, loginSession: any) {
    try {
      const isLikeExist = await this.likeRepository.count({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: reqBody.thread_id,
          },
        },
      });

      if (isLikeExist > 0) {
        throw new Error("You already like this thread!");
      }

      const like = this.likeRepository.create({
        thread: {
          id: reqBody.thread_id,
        },
        user: {
          id: loginSession.user.id,
        },
      });

      await this.likeRepository.save(like);

      return {
        message: "You like this thread",
        like: Like,
      };
    } catch (err) {
      throw new Error("Something went wrong in like");
    }
  }

  async delete(threadId: number, loginSession: any): Promise<any> {
    try {
      const like = await this.likeRepository.findOne({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: threadId,
          },
        },
      });

      if (!like) {
        throw new Error("You didn't like this thread");
      }

      await this.likeRepository.delete({
        id: like.id,
      });

      return {
        message: "You unlike this thread",
      };
    } catch (err) {
      throw new Error("Something went wrong in unlike");
    }
  }
}

export default new LikesServices();
