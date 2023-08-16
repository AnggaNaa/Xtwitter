import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findOne(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ["id", "full_name", "username", "email", "password"],
      });

      if (!user) {
        return res.status(401).json({ error: "Email tidak ditemukan" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Password salah" });
      }

      // Membuat token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, "inirahasia", {
        expiresIn: "1h",
      });

      res.json({ token, user }); // Kirim token ke klien
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const user = await this.userRepository.findOne({
        where: {
          id: loginSession.id,
        },
      });
      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new AuthServices();
