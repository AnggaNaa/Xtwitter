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
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Email tidak ditemukan" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Password salah" });
      }

      // Membuat token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, "bearer", {
        expiresIn: "1h",
      });

      res.json({ token }); // Kirim token ke klien
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }
}

export default new AuthServices();
