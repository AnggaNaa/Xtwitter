import { Text, Box, Button, Icon } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/Ri";
import { CgProfile } from "react-icons/Cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "@/stores/rootReducer";

export function NavbarLeft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    // const response = await API.get("/check");
    dispatch(AUTH_LOGOUT()); // Panggil aksi logout yang sesuai
    // localStorage.removeItem("token");

    navigate("/login");

    // localStorage.removeItem("token");
    // window.location.reload();
  }

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
        <Button mt={"13em"} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </>
  );
}
