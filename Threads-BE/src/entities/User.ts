import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Thread } from "./Thread";
import { Follow } from "./Follow";
import { Likes } from "./Like";
import { Reply } from "./Replie";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;
  // { select: false }
  @Column({ select: false }) // supaya password tidak muncul setelah login
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_background: string;

  @Column({ nullable: true })
  profile_description: string;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  threads: Thread[];

  @OneToMany(() => Likes, (like) => like.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  likes: Likes[];

  @OneToMany(() => Follow, (follow) => follow.followed, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  followings: Follow[];

  @OneToMany(() => Reply, (Reply) => Reply.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  replies: Reply[];
}
