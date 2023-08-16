import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";

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
  profile_description: string;

  @OneToMany(() => Thread, (thread) => thread.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  threads: Thread[];
}
