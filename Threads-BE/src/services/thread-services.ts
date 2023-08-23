import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response, response } from "express";
import { Thread } from "../entities/Thread";
import { v2 as cloudinary } from "cloudinary";
import { threadSChema } from "../utils/validation";
import cloudinaryConfig from "../libs/config";
import { promises } from "dns";
import { error } from "console";

class ThreadServices {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);

  async find(reqQuery?: any, loginSession?: any): Promise<any> {
    try {
      // const limit = parseInt(reqQuery.limit ?? 0);

      const threads = await this.threadRepository.find({
        relations: ["user", "likes.user", "replies"],
        order: {
          id: "DESC",
        },
        // take: limit,
      });

      return threads.map((element) => ({
        id: element.id,
        content: element.content,
        image: element.image,
        posted_at: element.posted_at,
        user: element.user,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id === loginSession.id
        ),
      }));
    } catch (err) {
      throw new Error("error find threads");
    }
  }

  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "likes.user", "replies"],
      });

      return {
        id: thread.id,
        content: thread.content,
        image: thread.image,
        posted_at: thread.posted_at,
        user: thread.user,
        replies_count: thread.replies.length,
        likes_count: thread.likes.length,
        is_liked: thread.likes.some(
          (like: any) => like.user.id === loginSession.id
        ),
      };
    } catch (err) {
      throw new Error("error findOne threads");
    }
  }
}

export default new ThreadServices();

//   async find(req: Request, res: Response): Promise<Response> {
//     try {
//       const threads = await this.threadRepository.find({
//         relations: ["user", "likes", "replies"],
//         order: { id: "DESC" },
//       });

//       let responseBaru = [];

//       threads.forEach((element) => {
//         responseBaru.push({
//           ...element,
//           likes_count: element.likes.length,
//           replies_count: element.replies.length,
//         });
//       });
//       return res.status(200).json(responseBaru);
//     } catch (err) {
//       return res.status(500).json({ error: "Error while getting threads" });
//     }
//   }

//   async findOne(req: Request, res: Response) {
//     const id = parseInt(req.params.id);
//     const thread = await this.threadRepository.findOne({
//       where: {
//         id: id,
//       },
//       relations: ["user"],
//     });
//     return res.status(200).json(thread);
//   }

//   async create(req: Request, res: Response) {
//     try {
//       const data = req.body;
//       const loginSession = res.locals.loginSession;
//       const filename = res.locals.filename;
//       console.log("ini data :", data);
//       console.log("ini login:", loginSession);
//       console.log("ini filename :", filename);

//       const { error } = threadSChema.validate(data);
//       if (error) {
//         return res.status(400).json({
//           error: error,
//         });
//       }

//       cloudinaryConfig();

//       // cloudinary.config({
//       //   cloud_name: process.env.CLOUD_NAME,
//       //   api_key: process.env.API_KEY,
//       //   api_secret: process.env.API,
//       // });
//       if (filename) {
//         const cloudinaryResponse = await cloudinary.uploader.upload(
//           "./uploads/" + filename
//         );
//         console.log("ini cloudinary : ", cloudinaryResponse);

//         const thread = this.threadRepository.create({
//           content: data.content,
//           image: cloudinaryResponse.secure_url,
//           user: loginSession.id,
//         });

//         const createThread = this.threadRepository.save(thread);
//         return res.status(200).json(createThread);
//       } else {
//         const thread = this.threadRepository.create({
//           content: data.content,
//           user: loginSession.id,
//         });

//         const createThread = this.threadRepository.save(thread);
//         return res.status(200).json(createThread);
//       }
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error while getting threads" });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     try {
//       const id = parseInt(req.params.id);
//       const deleteThread = await this.threadRepository.delete(id);
//       return res.status(200).json(deleteThread);
//     } catch (err) {
//       return res.status(500).json({ error: "Error while getting threads" });
//     }
//   }

//   async update(req: Request, res: Response) {
//     const id = parseInt(req.params.id);
//     const { content, image } = req.body;
//     const thread = await this.threadRepository.findOne({
//       where: {
//         id: id,
//       },
//     });

//     thread.content = content;
//     thread.image = image;

//     const updateThread = await this.threadRepository.save(thread);

//     return res.status(200).json(updateThread);
//   }
