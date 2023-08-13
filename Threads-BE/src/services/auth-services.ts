import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

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

      // Jika email dan password valid, kirimkan respons sukses
      return res.status(200).json({ message: "Login berhasil" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }
}

export default new AuthServices();
