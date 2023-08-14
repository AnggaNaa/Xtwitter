import { Avatar, Box, Text, Icon, Button, Image } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle, AiFillLike } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface User {
  id?: number;
  username?: string;
  full_name?: string;
  email?: string;
  profile_picture?: string;
  profile_description?: string | null;
  password?: string;
}

export interface ThreadCard {
  user?: User;
  id?: number;
  author_picture?: string;
  author_full_name?: string;
  author_username?: string;
  posted_at?: string;
  content?: string;
  image?: string;
  likes_count?: number;
  replies_count?: number;
  is_liked?: boolean;
}

export function ThreadCard(props: ThreadCard) {
  const [likesCount, setLikeCount] = useState(props.replies_count || 0);
  const [isLiked, setIsLike] = useState(props.is_liked || false);

  const handlerLikeClick = () => {
    if (isLiked) {
      setLikeCount(likesCount - 1);
    } else {
      setLikeCount(likesCount + 1);
    }
    setIsLike(!isLiked);
  };
  return (
    <>
      <Box>
        <Box border={"1px"} borderColor={"grey"} display="flex" pr={6} pt={5}>
          <Avatar name="a" mx={2} src={props.user?.profile_picture} />
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
              <Text style={{ color: "grey" }}>{props.posted_at}</Text>
            </Box>
            <Box mb={3}>
              <Link to={"detail/" + props.id}>
                <Text mb={2}> {props.content}</Text>
              </Link>
              <Image src={props.image} alt="" />
            </Box>
            <Box mb={5} display={"flex"} alignItems={"center"}>
              <Icon
                cursor={"pointer"}
                onClick={handlerLikeClick}
                color={isLiked ? "twitter.700" : "white"}
                fontSize="larger"
                mx={1}
                as={AiFillLike}
              ></Icon>
              <Text color="white"> {likesCount} Like </Text>
              <Link to={"detail/" + props.id}>
                <Button
                  size={"sm"}
                  ml={2}
                  color="white"
                  colorScheme="blackAlpha"
                >
                  <Icon as={ChatIcon} mr={2} color={"white"} />
                  {props.replies_count} Replies
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
