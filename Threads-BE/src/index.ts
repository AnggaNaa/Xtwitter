// import "dotenv/config"; // Impor dan gunakan dotenv
import { AppDataSource } from "./data-source";
import { Thread } from "./entities/Thread";
import * as express from "express";
import { Request, Response } from "express";
import router from "./route";
import * as dotenv from "dotenv";
// import { processQueue } from "./queues/worker";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    // processQueue();

    const cors = require("cors");

    // processQueue()

    app.use(cors());
    // const router = express.Router();

    app.use(express.json());
    app.use("/api/v1", router);

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
