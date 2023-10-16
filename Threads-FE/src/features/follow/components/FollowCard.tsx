import { API } from "@/lib/api";
import { SET_FOLLOW } from "@/stores/rootReducer";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { IFollow } from "@/interface/follow";
import useFollowHandler from "@/features/hooks/useFollow";

export function FollowCard(props: IFollow) {

  const { isLoading, handleFollow } = useFollowHandler(
    // props.id,
    // props.user_id,
    // props.is_followed
  );

  // const dispatch = useDispatch();
  // async function handleFollow(
  //   id: number,
  //   followedUserId: number,
  //   isFollowed: boolean
  // ) {
  //   try {
  //     if (!isFollowed) {
  //       await API.post(`/follow`, {
  //         followed_user_id: followedUserId,
  //       });
  //       dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
  //       // console.log("berhasil follow!", response.data);
  //     } else {
  //       await API.delete(`/follow/${followedUserId}`);
  //       dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
  //       // console.log("berhasil unfollow!", response.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <Box display={"flex"} width="100%" padding={"20px 0px"}>
        <Image
          src={props.profile_picture ?? "/user-placeholder.png"}
          width={"50px"}
          height={"50px"}
          objectFit={"cover"}
          borderRadius={"50%"}
          marginRight={"20px"}
          alt="user_profile_image"
        />

        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
            <Box display={"flex"}>
              <Text>{props.full_name}</Text>
            </Box>
            <Text color="brand.grey">@{props.username}</Text>
            <Text>Tes Doeloe</Text>
          </Box>
          <Box flex={1} display="flex" justifyContent={"flex-end"}>
            <Button
              // onClick={handleFollow} isLoading={isLoading}
              onClick={() =>
                handleFollow(props.id, props.user_id, props.is_followed)
              }
            >
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
