import { ChatIcon } from "@chakra-ui/icons";
import { Avatar, Icon, Button, Box, Text, Image } from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ThreadCard } from "../thread";

export function UserThread(props: ThreadCard) {
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
              {/* <Text style={{ color: "grey" }}>{props.threads?.posted_at}</Text> */}
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
                // onClick={() => handlerLikeClick(props.id, props.is_liked)}
                // color={props.threads?.is_liked ? "twitter.700" : "white"}
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
                onClick={() => `/threads/${props.id}`}
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
