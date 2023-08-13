import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { userSchema } from "../utils/validation";
import * as bcrypt from "bcrypt";

class UserServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.find({
        relations: ["threads"],
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ["threads"],
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
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
        return res.status(400).json({ error: "Email already exists" });
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
      const {
        username,
        full_name,
        email,
        password,
        profile_picture,
        profile_description,
      } = req.body;
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });

      user.username = username;
      user.full_name = full_name;
      user.email = email;
      user.password = password;
      user.profile_picture = profile_picture;
      user.profile_description = profile_description;

      const updateThread = await this.userRepository.save(user);

      return res.status(200).json(updateThread);
    } catch (err) {
      return res.status(500).json({ error: "Error while getting threads" });
    }
  }
}

export default new UserServices();
