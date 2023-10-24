import { API } from "@/lib/api";
import { GET_FOLLOWS, SET_FOLLOW } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function useFollowHandler() {
  // id: number,
  // followedUserId: number,
  // isFollowed: boolean
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const followState = useSelector(
    (state: RootState) => state.follow.followState
  );

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
      const response = await API.get(`/follows?type=${followState}`);
      dispatch(GET_FOLLOWS(response.data));
      setIsLoading(false);
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
