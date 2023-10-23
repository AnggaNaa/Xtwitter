import { ThreadCard } from "@/features/thread";
import { IFollow } from "./follow";

export interface IAUTH {
  id: number;
  username?: string;
  full_name?: string;
  email?: string;
  profile_picture?: string;
  profile_description?: string;
  password?: string;
  threads?: ThreadCard;
  profile_background?: string;
  follows?: IFollow;
}
