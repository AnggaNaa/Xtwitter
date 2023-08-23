import { Request, Response } from "express";
import express = require("express");
import threadController from "../controllers/thread-controller";
import userController from "../controllers/user-controller";
import authController from "../controllers/auth-controller";
import * as getRepository from "typeorm";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import verifyToken from "../middlewares/auth";
import { upload } from "../middlewares/uploadsFile";
import queueController from "../controllers/queue-controller";
import replieController from "../controllers/replie-controller";
import likeController from "../controllers/like-controller";

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

router.get("/threads", verifyToken, threadController.find);
router.get("/threads/:id", verifyToken, threadController.findOne);
// router.post("/threads", verifyToken, upload("image"), threadController.create);
router.post("/threads", verifyToken, upload("image"), queueController.enqueue);
// router.delete("/threads/delete/:id", verifyToken, threadController.delete);
// router.patch("/threads/update/:id", verifyToken, threadController.update);

router.get("/replies", verifyToken, replieController.find);
router.post("/reply", verifyToken, replieController.create);

router.post("/like", verifyToken, likeController.create);
router.delete("/like/:thread_id", verifyToken, likeController.delete);

router.get("/user", userController.find);
router.get("/user/:id", userController.findOne);
router.delete("/user/:id", userController.delete);
router.patch("/user/:id", userController.update);

router.get("/auth/check", verifyToken, authController.check);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// Contoh data pengguna (biasanya dari database)
// const users = [
//   { id: 1, email: 'user@example.com', password: 'password123' },
//   // ... data pengguna lainnya ...
// ];

export default router;
