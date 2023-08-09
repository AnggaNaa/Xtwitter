import { Request, Response } from "express";
import express = require("express");
import threadController from "../controllers/thread-controller";

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

export default router;
