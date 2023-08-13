import { Request, Response } from "express";
import express = require("express");
import threadController from "../controllers/thread-controller";
import userController from "../controllers/user-controller";
import authController from "../controllers/auth-controller";
import * as getRepository from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";

const router = express.Router();
// const router2 = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello from v1!");
});

// router.get("/threads", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "Hello this is threads!",
//   });
// });

router.get("/threads", threadController.find);
router.get("/threads/:id", threadController.findOne);
router.post("/threads/create", threadController.create);
router.delete("/threads/delete/:id", threadController.delete);
router.patch("/threads/update/:id", threadController.update);

router.get("/user", userController.find);
router.get("/user/:id", userController.findOne);
router.post("/user", userController.create);
router.delete("/user/:id", userController.delete);
router.patch("/user/:id", userController.update);

router.post("/login", authController.findOne);

// Contoh data pengguna (biasanya dari database)
// const users = [
//   { id: 1, email: 'user@example.com', password: 'password123' },
//   // ... data pengguna lainnya ...
// ];

export default router;
