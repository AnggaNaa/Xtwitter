import { Text, Box, Button, Icon } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_LOGOUT } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";

export function NavbarLeft() {
  const auth = useSelector((state: RootState) => state.auth);
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
        <Text
          fontSize="2xl"
          mb={4}
          cursor={"pointer"}
          onClick={() => navigate(`/user/search`)}
        >
          <Icon as={AiOutlineSearch} mr={2}></Icon> Search
        </Text>
        <Link to={"/follows"}>
          <Text fontSize="2xl" mb={3}>
            <Icon as={RiUserFollowFill} mr={3}></Icon>Follow
          </Text>
        </Link>
        <Text
          fontSize="2xl"
          mb={10}
          onClick={() => navigate(`/profile/` + auth.id)}
          cursor="pointer"
        >
          <Icon as={CgProfile} mr={3}></Icon>
          Profile
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
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </>
  );
}
