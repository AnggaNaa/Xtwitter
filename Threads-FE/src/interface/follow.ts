import { User } from "@/features/thread";

export interface IFollow {
  id: number;
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  is_followed: boolean;
  profile_description: string;
}
