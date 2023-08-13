import { Avatar, Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import { ChatIcon } from "@chakra-ui/icons";
import { ThreadCard } from "@/features/thread/components";
import {
  AiFillCheckCircle,
  AiFillLike,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { API } from "@/lib/api";

export function DetailProject() {
  const { id } = useParams();
  const [Threads, setThread] = useState<ThreadCard[]>([]);
  // const [data, _] = useState(ThreadCard);
  const fetchData = async () => {
    try {
      const response = await API.get("/threads");
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const element = Threads.find((el) => el.id === Number(id));

  return element ? (
    <>
      <Box borderX={"1px"} borderColor={"grey"}>
        <Box display={"flex"} alignItems={"center"}>
          <Link to={"/"}>
            <Icon m={2} fontSize={"1.8em"} as={AiOutlineArrowLeft}></Icon>
          </Link>
          <Text as="b" fontSize={"2xl"}>
            Status
          </Text>
        </Box>
        <Box display="flex" pr={6} pt={5}>
          <Avatar name="a" mx={2} src={element.author_picture} />
          <Box gap={2}>
            <Box display="flex" gap={2} mb={1} alignContent={"center"}>
              <Text as="b">{element.user?.full_name}</Text>
              <Box display={"flex"} alignItems={"center"}>
                <Text style={{ color: "grey" }}>
                  {" "}
                  @{element.user?.username}{" "}
                </Text>
                <Icon
                  fontSize="larger"
                  color="twitter.500"
                  ms={1}
                  as={AiFillCheckCircle}
                ></Icon>
              </Box>
              <Text style={{ color: "grey" }}>{element.posted_at}</Text>
            </Box>
            <Box mb={3}>
              <Text mb={2}>{element.content}</Text>
              <img src={element.image} alt="" />
            </Box>
            <Box mb={5} display={"flex"} alignItems={"center"}>
              <Icon
                cursor={"pointer"}
                fontSize="larger"
                color={"white"}
                mx={1}
                as={AiFillLike}
              ></Icon>
              <Text color="white">{element.likes_count} Like </Text>
              <Box ml={2}>
                <Icon as={ChatIcon} mr={1} />
                {element.replies_count} Replies
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box
          display={"flex"}
          my={5}
          alignItems={"center"}
          p={3}
          m={0}
          border={"1px"}
          borderColor={"grey"}
        >
          <Avatar src="https://berita.yodu.id/wp-content/uploads/2023/05/urutan-nonton-one-piece.png"></Avatar>
          <Input placeholder="Type your reply!" size="lg" border={0} />
          <Icon as={ImFilePicture} fontSize={"1.5em"} mx={4}></Icon>
          <Button
            size={"sm"}
            borderRadius={"20"}
            px={5}
            colorScheme={"teal"}
            color={"white"}
          >
            Post
          </Button>
        </Box>
        <Box borderX={"1px"} borderColor={"grey"}>
          <Box display="flex" pr={6} pt={5}>
            <Avatar name="a" mx={2} src={element.author_picture} />
            <Box gap={2}>
              <Box display="flex" gap={2} mb={1} alignContent={"center"}>
                <Text as="b">{element.author_full_name}</Text>
                <Box display={"flex"} alignItems={"center"}>
                  <Text style={{ color: "grey" }}>
                    {" "}
                    @{element.user?.username}{" "}
                  </Text>
                  <Icon
                    fontSize="larger"
                    color="twitter.500"
                    ms={1}
                    as={AiFillCheckCircle}
                  ></Icon>
                </Box>
                <Text style={{ color: "grey" }}>{element.posted_at}</Text>
              </Box>
              <Box mb={3}>
                <Text mb={2}>{element.content}</Text>
              </Box>
              <Box mb={5} display={"flex"} alignItems={"center"}>
                <Icon
                  cursor={"pointer"}
                  fontSize="larger"
                  mx={1}
                  as={AiFillLike}
                ></Icon>
                {element.likes_count} Like
                <Button size={"sm"} ml={2} colorScheme="grey">
                  <Icon as={ChatIcon} mr={2} />
                  {element.replies_count} Replies
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <h1>Salah Tong !</h1>
  );
}
