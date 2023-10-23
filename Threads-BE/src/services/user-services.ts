import { ILike, Like, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { userSchema } from "../utils/validation";
import * as bcrypt from "bcrypt";
import cloudinaryConfig from "../libs/config";
import { v2 as cloudinary } from "cloudinary";
// import generateRandomIndices from "../controllers/random-controller";

class UserServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async searchByName(req: Request, res: Response): Promise<Response> {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({ error: "Missing search query" });
      }

      const users = await this.userRepository.find({
        // relations: ["threads"],
        where: [
          { full_name: ILike(`%${query}%`) },
          { username: Like(`%${query}%`) },
        ],
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: "Error while searching users" });
    }
  }

  async getRandomUsersWithFollow(): Promise<User[]> {
    const totalUsers = await this.userRepository.count();
    // const randomIndices = generateRandomIndices(totalUsers, 3);

    const randomUsers = await this.userRepository
      .createQueryBuilder("user")
      .orderBy("RANDOM()")
      .take(2)
      // .where("user.id IN (:...randomIndices)", { randomIndices })
      // .leftJoinAndSelect('user.followers', 'follower')
      // .leftJoinAndSelect('user.following', 'following')
      .getMany();

    return randomUsers;
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ["threads", "threads.user"],
        order: {
          // threads: "DESC",
          threads: {
            id: "DESC",
          },
        },
      });
      return res.status(200).json(user);
      // relations: ["threads"],

      // try {
      //   const idFromSession = req.body.user.id; // Ganti dengan properti yang sesuai dalam sesi login Anda
      //   if (idFromSession === undefined) {
      //     return res.status(400).json({ error: 'User ID not found in session' });
      //   }

      //   const user = await this.userRepository.findOne(idFromSession);

      //   if (!user) {
      //     return res.status(404).json({ error: 'User not found' });
      //   }
    } catch (err) {
      throw new Error("Error while getting findOne User");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = userSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error.details });
      }

      const existingUser = await this.userRepository.findOne({
        where: { email: value.email },
      });
      if (existingUser) {
        return res.status(400).json(error);
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = this.userRepository.create({
        username: value.username,
        full_name: value.full_name,
        email: value.email,
        password: hashedPassword,
        // profile_picture: data.profile_picture,
        // profile_description: data.profile_description,
      });
      const createUser = this.userRepository.save(user);
      return res.status(200).json(createUser);
    } catch (err) {
      return res.status(500).json({ error: "Error create user" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleteThread = await this.userRepository.delete(id);
      return res.status(200).json(deleteThread);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      // const filename = res.locals.filename;
      // console.log("ini filename :", filename);
      // const profilePictureFilename = res.locals.profile_picture;
      // const profileBackgroundFilename = res.locals.profile_background;
      // const profilePictureFilename = res.locals.filename;
      // const profilePictureFilename = res.locals.profile_picture;
      // const profilePictureFilename = req.files["profile_picture"];
      // const profileBackgroundFilename = req.files["profile_background"];
      // const profilePictureFilename = req.files["profile_picture"];
      // const profileBackgroundFilename = req.files["profile_background"];

      // console.log("ini profilePictureFilename :", profilePictureFilename);
      // console.log("ini profileBackgroundFilename :", profileBackgroundFilename);

      // const profilePictureFile = req.file; // Mengakses berkas menggunakan req.file
      // const profileBackgroundFile = req.files["profile_background"];

      // console.log("ini profilePictureFile:", profilePictureFile);
      // console.log("ini profileBackgroundFile:", profileBackgroundFile);
      const objUser = {};
      const images = req.files;
      Object.keys(images).forEach((key) => {
        objUser[images[key][0].fieldname] = images[key][0].filename;
      });
      console.log("ini objUser", objUser);

      // const currentKey = Object.keys(image)[0];
      // const file = image[currentKey][0].filename;

      const { username, full_name, email, password, profile_description } =
        req.body;
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });

      cloudinaryConfig();

      await Promise.all(
        Object.keys(objUser).map(async (key) => {
          const profilePictureCloudinaryResponse =
            await cloudinary.uploader.upload("./uploads/" + objUser[key]);
          user[key] = profilePictureCloudinaryResponse.secure_url;
          console.log("ini cloudinary : ", profilePictureCloudinaryResponse);
        })
      );

      console.log("ini pp", user.profile_picture);

      // if (image[0]?.filename) {
      //   const profilePictureCloudinaryResponse =
      //     await cloudinary.uploader.upload(
      //       "./uploads/" + image[0]?.filename
      //     );
      //   user.profile_picture = profilePictureCloudinaryResponse.secure_url;
      // }

      // if (profileBackgroundFilename) {
      //   const profileBackgroundCloudinaryResponse =
      //     await cloudinary.uploader.upload(
      //       "./uploads/" + profileBackgroundFilename
      //     );
      //   user.profile_background =
      //     profileBackgroundCloudinaryResponse.secure_url;
      // }

      // if (profilePictureFile) {
      //   const profilePictureCloudinaryResponse =
      //     await cloudinary.uploader.upload(profilePictureFile.path);
      //   user.profile_picture = profilePictureCloudinaryResponse.secure_url;
      // }

      // if (profileBackgroundFile) {
      //   const profileBackgroundCloudinaryResponse =
      //     await cloudinary.uploader.upload(profileBackgroundFile[0].path);
      //   user.profile_background =
      //     profileBackgroundCloudinaryResponse.secure_url;
      // }

      user.username = username;
      user.full_name = full_name;
      user.email = email;
      user.password = password;
      user.profile_description = profile_description;
      // user[image[0]?.fieldname] = image[0]?.filename;

      // if (filename) {
      //   const cloudinaryResponse = await cloudinary.uploader.upload(
      //     "./uploads/" + filename
      //   );
      //   console.log("ini cloudinary : ", cloudinaryResponse);
      //   user.username = username;
      //   user.full_name = full_name;
      //   user.email = email;
      //   user.password = password;
      //   user.profile_picture = cloudinaryResponse.secure_url;
      //   user.profile_description = profile_description;
      // }
      // user.profile_background = profile_background;

      const updateThread = await this.userRepository.save(user);

      // return res.status(200).json({ message: "done bos" });
      return res.status(200).json(updateThread);
    } catch (err) {
      // return res.status(500).json(err);
      return res.status(500).json({ error: "Error while getting update" });
    }
  }
}

// function generateRandomIndices(totalCount: number, count: number): number[] {
//   const randomIndices = [];
//   while (randomIndices.length < count) {
//     const randomIndex = Math.floor(Math.random() * totalCount);
//     if (!randomIndices.includes(randomIndex)) {
//       randomIndices.push(randomIndex);
//     }
//   }
//   return randomIndices;
// }

// const userServices = new UserServices();
export default new UserServices();
