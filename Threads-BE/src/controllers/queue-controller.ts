import * as amqp from "amqplib";
import { Request, Response } from "express";
import { threadSChema } from "../utils/validation";

class QueueController {
  async enqueue(req: Request, res: Response) {
    try {
      const queueName = "thread-queue";
      const filename = res.locals.filename;
      // const data = {
      //   content: req.body.content,
      //   image: filename,
      // };
      // const { error } = threadSChema.validate(data);
      // if (error) {
      //   return res.status(400).json({ error: error });
      // }

      const loginSession = res.locals.loginSession;

      const payload = {
        content: req.body.content,
        image: filename,
        user_id: loginSession.id,
      };

      console.log("iki payload", payload);
      console.log("user id", payload.user_id);

      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue(queueName);

      channel.sendToQueue("thread-queue", Buffer.from(JSON.stringify(payload)));
      await channel.close();
      await connection.close();

      res.status(200).json({
        message: "Threads is queued!",
      });
    } catch (error) {
      console.error("Error enqueueing message: ", error);
      res.status(500).json({
        error: "Something wrong in server amqp!",
      });
    }
  }
}

export default new QueueController();
