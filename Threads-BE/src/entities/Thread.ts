import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Likes } from "./Like";
import { Reply } from "./Replie";

@Entity({ name: "threads" })
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @OneToMany(() => Likes, (like) => like.thread, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  likes: Likes[];

  @OneToMany(() => Reply, (like) => like.thread, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  replies: Reply[];

  @ManyToOne(() => User, (user) => user.threads, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
