import { Text, Box, Button, Icon } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/Ri";
import { CgProfile } from "react-icons/Cg";
import { Link } from "react-router-dom";

export function NavbarLeft() {
  return (
    <>
      <Box
        ml={5}
        position={"fixed"}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
      >
        <Text color="whatsapp.600" fontSize="6xl" as="b">
          Xtwitter
        </Text>
        <Link to={""}>
          <Text fontSize="2xl" mb={4}>
            {" "}
            <Icon as={AiFillHome} mr={3}></Icon>Home{" "}
          </Text>
        </Link>
        <Text fontSize="2xl" mb={4}>
          <Icon as={AiOutlineSearch} mr={2}></Icon> Search
        </Text>
        <Text fontSize="2xl" mb={3}>
          <Icon as={RiUserFollowFill} mr={3}></Icon>Follow
        </Text>
        <Text fontSize="2xl" mb={10}>
          <Icon as={CgProfile} mr={3}></Icon>Profile
        </Text>
        <Button
          width={"300px"}
          fontSize="2xl"
          bg={"teal"}
          colorScheme="teal"
          color={"white"}
        >
          Create Post
        </Button>
      </Box>
    </>
  );
}
