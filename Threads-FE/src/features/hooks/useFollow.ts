import { IFollow } from "@/interface/follow";
import { API } from "@/lib/api";
import { SET_FOLLOW } from "@/stores/rootReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useFollowHandler() {
  // id: number,
  // followedUserId: number,
  // isFollowed: boolean
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async (
    id: number,
    followedUserId: number,
    isFollowed: boolean
  ) => {
    setIsLoading(true);
    try {
      if (!isFollowed) {
        await API.post(`/follow`, { followed_user_id: followedUserId });
      } else {
        await API.delete(`/follow/${followedUserId}`);
      }
      dispatch(SET_FOLLOW({ id, isFollowed: !isFollowed }));
    } catch (err) {
      console.log("ini eror follow di search", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    handleFollow,
  };

  // try {
  //   if (!isFollowed) {
  //     await API.post(`/follow`, { followed_user_id: followedUserId,
  //     });
  //     dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
  //     // console.log("berhasil follow!", response.data);
  //   } else {
  //     await API.delete(`/follow/${followedUserId}`);
  //     dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
  //     // console.log("berhasil unfollow!", response.data);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
}
