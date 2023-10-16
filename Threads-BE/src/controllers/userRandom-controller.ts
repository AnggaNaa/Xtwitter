// UserController.ts
import { Request, Response } from "express";
import userServices from "../services/user-services"; // Sesuaikan dengan path kelas UserServices

// const userServices = new UserServices();

export async function getRandomUsers(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const randomUsers = await userServices.getRandomUsersWithFollow();
    return res.status(200).json(randomUsers);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
