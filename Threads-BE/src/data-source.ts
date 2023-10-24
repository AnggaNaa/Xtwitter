import "reflect-metadata";
import { DataSource } from "typeorm";
import { Thread } from "./entities/Thread";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "200799",
//   database: "threads",
//   synchronize: true,
//   logging: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "containers-us-west-90.railway.app",
  port: 7774,
  username: "postgres",
  password: "cJKKIP20PIRvvXVbjY1G",
  database: "railway",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
