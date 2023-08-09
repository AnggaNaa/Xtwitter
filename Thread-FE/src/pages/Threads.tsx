import { ThreadCard } from "@/features/thread/components";
import { Avatar, Box, Button, Icon, Input } from "@chakra-ui/react";
import { ImFilePicture } from "react-icons/im";
import Data from "../utils/dummy.json";
import { useState } from "react";

export function Threads() {
  const [data, _] = useState(Data);
  return (
    <>
      <Box
        display={"flex"}
        my={5}
        alignItems={"center"}
        p={3}
        m={0}
        borderX={"1px"}
        borderColor={"grey"}
      >
        <Avatar src="https://berita.yodu.id/wp-content/uploads/2023/05/urutan-nonton-one-piece.png"></Avatar>
        <Input placeholder="What is happening ?!" size="lg" border={0} />
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

      {data.map((dummy, i) => (
        <ThreadCard
          key={i}
          id={dummy.id}
          author_full_name={dummy.author_full_name}
          author_picture={dummy.author_picture}
          author_username={dummy.author_username}
          content={dummy.content}
          images={dummy.images}
          likes_count={dummy.likes_count}
          posted_at={dummy.posted_at}
          replies_count={dummy.replies_count}
        />
      ))}
    </>
  );
}
