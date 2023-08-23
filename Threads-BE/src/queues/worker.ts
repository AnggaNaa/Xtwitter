import * as amqp from "amqplib";
import cloudinaryConfig from "../libs/config";
import { AppDataSource } from "../data-source";
import { Thread } from "../entities/Thread";
import { v2 as cloudinary } from "cloudinary";

export async function processQueue() {
  const queueName = "thread-queue";
  cloudinaryConfig();
  // cloudinary.config({
  //   cloud_name: "daqitl4oc",
  //   api_key: "664683232595348",
  //   api_secret: "_ePVIHvaFcP4isCL52QZv8RraV0",
  //   secure: true,
  // });

  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    await channel.consume(queueName, async (message) => {
      if (message !== null) {
        try {
          const payload = JSON.parse(message.content.toString());
          console.log("Received message: ", payload);
          if (payload.image) {
            const cloudinaryResponse = await cloudinary.uploader.upload(
              "./uploads/" + payload.image
            );
            console.log("ini cloudinaryResponse :", cloudinaryResponse);

            const thread = AppDataSource.getRepository(Thread).create({
              content: payload.content,
              image: cloudinaryResponse.secure_url,
              user: { id: payload.user_id },
            });
            console.log("Ini payload: ", payload);

            const createThread = await AppDataSource.getRepository(Thread).save(
              thread
            );
          } else {
            const thread = AppDataSource.getRepository(Thread).create({
              content: payload.content,
              user: { id: payload.user_id },
            });
            const createThread = await AppDataSource.getRepository(Thread).save(
              thread
            );
          }
          channel.ack(message);
        } catch (error) {
          console.log("Error baris 43 : ", error);
        }
      }
    });
  } catch (error) {
    console.error("Error processing queue: ", error);
  }
}

AppDataSource.initialize().then(async () => {
  processQueue();
});
