import { Avatar, Box, Text, Icon, Button, Image } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle, AiFillLike } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useThreadCard } from "@/features/auth/hooks/useThread";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import { IAUTH } from "@/interface/auth";
import { IFollow } from "@/interface/follow";

export interface User {
  id: number;
  username?: string;
  full_name?: string;
  email?: string;
  profile_picture?: string;
  profile_background?: string;
  profile_description?: string | null;
  password?: string;
  follows: IFollow;
  is_followed: boolean;
  auth: IAUTH;
  // follow: IFollow;
  // threads?: ThreadCard;
}

export interface ThreadCard {
  user?: User;
  id: number;
  posted_at: string;
  content?: string;
  image?: string;
  likes_count: number;
  replies_count?: number;
  is_liked: boolean;
}

export interface IThreadPost {
  content: string;
  image: Blob | MediaSource | string;
}

export function ThreadCard(props: ThreadCard) {
  const navigate = useNavigate();
  const { handlerLikeClick } = useThreadCard();

  const postDate_at = parseISO(props.posted_at);

  const today = new Date();
  const postDay = new Date(postDate_at);

  const differenceDays = differenceInDays(today, postDay);
  const differencehours = differenceInHours(today, postDay);
  const differenceMinutes = differenceInMinutes(today, postDay);

  let postDay_at = "";

  if (differenceDays > 0) {
    postDay_at = `${differenceDays} day ago `;
  } else if (differencehours > 0) {
    postDay_at = `${differencehours} hour ago`;
  } else {
    postDay_at = `${differenceMinutes} minute ago`;
  }

  // const handlerLikeClick = () => {
  //   if (isLiked) {
  //     setLikeCount(likesCount - 1);
  //   } else {
  //     setLikeCount(likesCount + 1);
  //   }
  //   setIsLike(!isLiked);
  // };

  return (
    <>
      <Box>
        <Box border={"1px"} borderColor={"grey"} display="flex" pr={6} pt={5}>
          <Link to={`/profile/${props.user?.id}`}>
            <Avatar mx={2} src={props.user?.profile_picture ?? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697414400&semt=ais"} />
          </Link>
          <Box gap={2}>
            <Box display="flex" gap={2} mb={1} alignContent={"center"}>
              <Text as="b">{props.user?.full_name}</Text>
              <Box display={"flex"} alignItems={"center"}>
                <Text style={{ color: "grey" }}> @{props.user?.username} </Text>
                <Icon
                  fontSize="larger"
                  color="twitter.500"
                  ms={1}
                  as={AiFillCheckCircle}
                ></Icon>
              </Box>
              <Text style={{ color: "grey" }}>{postDay_at}</Text>
            </Box>
            <Box mb={3}>
              {/* <Link to={"detail/" + props.id}> */}
              <Text
                mb={2}
                onClick={() => navigate(`/detail/${props.id}`)}
                cursor={"pointer"}
              >
                {" "}
                {props.content}
              </Text>
              {/* </Link> */}
              <Image src={props.image} alt="" />
            </Box>
            <Box mb={5} display={"flex"} alignItems={"center"}>
              <Icon
                cursor={"pointer"}
                onClick={() => handlerLikeClick(props.id, props.is_liked)}
                color={props.is_liked ? "twitter.700" : "white"}
                fontSize="larger"
                mx={1}
                as={AiFillLike}
              ></Icon>
              <Text color="white"> {props.likes_count} Like </Text>
              {/* <Link to={"detail/" + props.id}> */}
              <Button
                size={"sm"}
                ml={2}
                color="white"
                colorScheme="blackAlpha"
                onClick={() => navigate(`/detail/${props.id}`)}
                cursor={"pointer"}
              >
                <Icon as={ChatIcon} mr={2} color={"white"} />
                {props.replies_count} Replies
              </Button>
              {/* </Link> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
