import { RootState } from "@/stores/types/rootState";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Avatar,
  Button,
  Icon,
} from "@chakra-ui/react";

import {
  AiFillCheckCircle,
  AiFillFacebook,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User } from "./ThreadCard";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import { GET_FOLLOWS } from "@/stores/rootReducer";
import { useDispatch } from "react-redux";
import useFollowHandler from "@/features/hooks/useFollow";

// interface IRandomUser {
//   id: Number;
//   name: String;
// }

export function NavbarRight() {
  // const { User, getUserById } = useProfile();
  const auth = useSelector((state: RootState) => state.auth);
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const followState = useSelector(
    (state: RootState) => state.follow.followState
  )
  console.log("followState", followState)
  const follows = useSelector((state: RootState) => state.follow.follows);
  const { isLoading, handleFollow } = useFollowHandler();
  const dispatch = useDispatch();

  async function fetchData() {
    const response = await API.get("/random-users");
    const data = response.data;
    setRandomUsers(data);
  }

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    fetchData();
    getFollowData();
  }, []);

  //   fetchData();
  // }, [auth]);

  return (
    <>
      <Box position={"fixed"}>
        <Box p={2}>
          <Card
            width={"380px"}
            height={"430px"}
            bg={"gray.900"}
            color={"whiteAlpha.800"}
          >
            <CardBody>
              <Heading size="md" mt={-3}>
                My Profile
              </Heading>
              <Box display={"flex"} flexDirection={"column"}>
                <Image
                  src={auth.profile_background}
                  height={"13em"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Image
                  src={auth.profile_picture}
                  height={"100px"}
                  width={"100px"}
                  objectFit={"cover"}
                  mt={-16}
                  ml={3}
                  borderRadius={"50%"}
                  border={"4px solid white"}
                />
                <Box mt={"-7"}>
                  <Link to={"/myprofile/" + auth.id}>
                    <Button float={"right"}>Edit Profile</Button>
                  </Link>
                </Box>
              </Box>
              <Stack mt="2" spacing="2">
                <Heading size="md" display={"flex"} alignItems={"center"}>
                  {/* Angga Nur A{" "} */}
                  {auth.full_name}
                  <Icon color={"twitter.500"} as={AiFillCheckCircle}></Icon>
                </Heading>
                <Text>@{auth.username}</Text>
                <Text noOfLines={1}>{auth.profile_description}</Text>
                <Box display={"flex"}>
                  <Text mr={1}>111 </Text>
                  <Text mr={5}>Following</Text>
                  <Text mr={1}>291 </Text>
                  <Text> Follower</Text>
                </Box>
              </Stack>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter></CardFooter>
          </Card>
        </Box>
        <Box p={2}>
          <Card
            width={"380px"}
            height={"190px"}
            bg={"gray.900"}
            color={"whiteAlpha.800"}
          >
            {randomUsers.map((user) => (
              <CardBody
                display={"flex"}
                justifyContent={"space-between"}
                key={user.id}
              >
                <Box display={"flex"}>
                  <Avatar src="https://assets.ayobandung.com/crop/152x71:1413x663/750x500/webp/photo/2022/11/02/2204493026.jpeg" />
                  <Box ml={3}>
                    <Text>{user.full_name}</Text>
                    <Text>@ {user.username}</Text>
                  </Box>
                </Box>
                <Box>
                  <Button
                    colorScheme="gray"
                    border={10}
                    borderColor={"black"}
                    borderRadius={20}
                    px={4}
                    mt={1}
                    fontSize={"sm"}
                    onClick={() => handleFollow(auth.id, user.id, follows.some(follow => follow.user_id === user.id))}
                    isLoading={isLoading}
                  >
                    {/* Follow */}
                    {follows.some(follow => follow.user_id === user.id) ? "Unfollow" : "Follow"}
                  </Button>
                </Box>
              </CardBody>
            ))}
          </Card>
        </Box>
        {/* <Box p={2}>
          <Card
            width={"380px"}
            height={"190px"}
            bg={"gray.900"}
            color={"whiteAlpha.800"}
          >
            <CardBody display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"}>
                <Avatar src="https://assets.ayobandung.com/crop/152x71:1413x663/750x500/webp/photo/2022/11/02/2204493026.jpeg" />
                <Box ml={3}>
                  <Text>Vinsmoke sanji</Text>
                  <Text>@Vinsmoke</Text>
                </Box>
              </Box>
              <Box>
                <Button
                  colorScheme="gray"
                  border={10}
                  borderColor={"black"}
                  borderRadius={20}
                  px={8}
                  mt={1}
                >
                  Follow
                </Button>
              </Box>
            </CardBody>

            <CardBody display={"flex"} justifyContent={"space-between"} mt={-8}>
              <Box display={"flex"}>
                <Avatar src="https://assets.ayobandung.com/crop/152x71:1413x663/750x500/webp/photo/2022/11/02/2204493026.jpeg" />
                <Box ml={3}>
                  <Text>Vinsmoke sanji</Text>
                  <Text>@Vinsmoke</Text>
                </Box>
              </Box>
              <Box>
                <Button
                  bg={"blackAlpha.800"}
                  color={"whiteAlpha.700"}
                  colorScheme="blackAlpha"
                  border={10}
                  borderColor={"black"}
                  borderRadius={20}
                  px={8}
                  mt={1}
                >
                  Follow
                </Button>
              </Box>
            </CardBody>

            <CardBody display={"flex"} justifyContent={"space-between"} mt={-8}>
              <Box display={"flex"}>
                <Avatar src="https://assets.ayobandung.com/crop/152x71:1413x663/750x500/webp/photo/2022/11/02/2204493026.jpeg" />
                <Box ml={3}>
                  <Text>Vinsmoke sanji</Text>
                  <Text>@Vinsmoke</Text>
                </Box>
              </Box>
              <Box>
                <Button
                  bg={"blackAlpha.800"}
                  color={"whiteAlpha.700"}
                  colorScheme="blackAlpha"
                  border={10}
                  borderColor={"black"}
                  borderRadius={20}
                  px={8}
                  mt={1}
                >
                  Follow
                </Button>
              </Box>
            </CardBody>
            {/* <Divider /> */}
        {/* <CardFooter></CardFooter>
          </Card>
        </Box> */}{" "}
        {/* } */}
        <Box p={2}>
          <Card width={"380px"} bg={"gray.900"} color={"whiteAlpha.800"}>
            <CardBody display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={2}>
                <Text>Developed by DUMBWAYS.ID</Text>
                <Icon as={AiFillGithub} fontSize={"2xl"}></Icon>
                <Icon as={AiFillLinkedin} fontSize={"2xl"}></Icon>
                <Icon as={AiFillFacebook} fontSize={"2xl"}></Icon>
                <Icon as={AiFillTwitterCircle} fontSize={"2xl"}></Icon>
              </Box>
            </CardBody>
            <CardBody
              display={"flex"}
              alignItems={"center"}
              mt={-9}
              fontSize={13}
            >
              <Box>
                <Text>Powered by </Text>
              </Box>
              <Box mx={1}>
                <Image
                  boxSize={"15px"}
                  src="https://dumbways.id/assets/images/brandred.png"
                  alt=""
                />
              </Box>
              <Box>
                <Text> Dumbways Indonesia . #1CodingBootcamp</Text>
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
}
