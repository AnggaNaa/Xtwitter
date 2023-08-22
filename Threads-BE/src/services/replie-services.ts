import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Replies } from "../entities/Replie";

class ReplieServices {
  private readonly replieRepository: Repository<Replies> =
    AppDataSource.getRepository(Replies);

  async find(reqQuery): Promise<any> {
    try {
      const threadId = parseInt(reqQuery.threadId ?? 0);

      const replies = await this.replieRepository.find({
        relations: ["user"],
        where: {
          thread: {
            id: threadId,
          },
        },
        order: {
          id: "DESC",
        },
      });
      return replies;
    } catch (err) {
      throw new Error("eror find replies");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const reply = this.replieRepository.create({
        content: reqBody.content,
        user: {
          id: loginSession.id,
        },
        thread: {
          id: reqBody.thread_id,
        },
      });

      await this.replieRepository.save(reply);
      return;
    } catch (err) {
      throw new Error("error create replie");
    }
  }
}

export default new ReplieServices();
