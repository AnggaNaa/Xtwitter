import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "follows" })
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follower, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  follower: User;

  @ManyToOne(() => User, (user) => user.following, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  followed: User;
}
