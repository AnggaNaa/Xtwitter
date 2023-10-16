import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import { Request, Response, response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { loginSchema, userSchema } from "../utils/validation";
import { error } from "console";

class AuthServices {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  // async findOne(req: Request, res: Response) {
  //   const { email, password } = req.body;

  //   try {
  //     const user = await this.userRepository.findOne({
  //       where: { email },
  //       select: ["id", "full_name", "username", "email", "password"],
  //     });

  //     if (!user) {
  //       return res.status(401).json({ error: "Email tidak ditemukan" });
  //     }

  //     const isPasswordValid = await bcrypt.compare(password, user.password);

  //     if (!isPasswordValid) {
  //       return res.status(401).json({ error: "Password salah" });
  //     }

  //     // Membuat token JWT
  //     const token = jwt.sign({ id: user.id, email: user.email }, "inirahasia", {
  //       expiresIn: "1h",
  //     });

  //     res.json({ token, user }); // Kirim token ke klien
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res.status(500).json({ error: "Terjadi kesalahan pada server" });
  //   }
  // }

  async register(reqBody: any): Promise<any> {
    try {
      const { error, value } = userSchema.validate(reqBody);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const isEmailRegistered = await this.authRepository.findOne({
        where: { email: value.email },
      });
      if (isEmailRegistered) {
        throw new Error("Email already registered.");
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = this.authRepository.create({
        username: value.username,
        full_name: value.full_name,
        email: value.email,
        password: hashedPassword,
      });

      await this.authRepository.save(user);
      return {
        message: "Registration successful!",
        user: user,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async login(reqBody: any): Promise<any> {
    // const { email, password } = reqBody;
    try {
      const { error } = loginSchema.validate(reqBody);

      if (error) {
        throw new Error(error.details[0].message);
      }
      const user = await this.authRepository.findOne({
        where: { email: reqBody.email },
        select: [
          "id",
          "full_name",
          "username",
          "email",
          "password",
          "profile_picture",
          "profile_description",
          "profile_background",
        ],
      });

      if (!user) {
        throw new Error("Email tidak ditemukan");
      }

      const isPasswordValid = await bcrypt.compare(
        reqBody.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Password salah");
      }

      // Membuat token JWT
      const token = jwt.sign(
        {
          user,
          // id: user.id,
          // fullname: user.full_name,
          // username: user.username,
          // email: user.email,
        },
        "inirahasia",
        {
          expiresIn: "1h",
        }
      );
      return {
        message: "Login Successfull",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          profile_picture: user.profile_picture,
          profile_description: user.profile_description,
          profile_background: user.profile_background,
        },
        token: token,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async check(loginSession: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });
      return {
        message: "Token is valid",
        user: {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          email: user.email,
          profile_picture: user.profile_picture,
          profile_description: user.profile_description,
          profile_background: user.profile_background,
        },

        // user: user,
      };
    } catch (err) {
      throw new Error("Token is not valid");
    }
  }

  // async check(req: Request, res: Response) {
  //   try {
  //     const loginSession = res.locals.loginSession;
  //     const user = await this.userRepository.findOne({
  //       where: {
  //         id: loginSession.id,
  //       },
  //     });
  //     return res.status(200).json({
  //       user,
  //       message: "Token is valid",
  //     });
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // }
}

export default new AuthServices();
