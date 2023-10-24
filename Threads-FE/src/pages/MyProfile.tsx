// import { useThreadCard } from "@/features/auth/hooks/useThread";
import { ThreadCard, User } from "@/features/thread";
import { IFollow } from "@/interface/follow";
import { API } from "@/lib/api";
import { GET_FOLLOWS, GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
// import { ChatIcon } from "@chakra-ui/icons";
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Flex,
//   Heading,
//   Icon,
//   Image,
//   Stack,
//   Text,
//   Textarea,
//   VStack,
// } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
// import { AiFillCheckCircle, AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


// type IFollower = {
//   id: number;
//   username: string;
// }

// type IFollowing = {
//   id: number;
//   username: string;
// }

export default function UserProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  // const user = useSelector((state: RootState) => state.user.userThreads);
  // const followState = useSelector((state: RootState) => state.follow.followState);
  const follows = useSelector((state: RootState) => state.follow.follows);

  const followers = follows.filter((follow) => follow.is_followed)
  const following = follows.filter((follow) => !follow.is_followed);

  const totalFollowers = followers.length;
  const totalFollowing = following.length;

  console.log("followersCount", totalFollowers);
  console.log("followingsCount", totalFollowing);

  // Menghitung jumlah yang diikuti
  // const followingCount = follows.filter((follow) => follow.followState === "following").length;

  const dispatch = useDispatch();

  const threads = useSelector((state: RootState) => state.thread.threads);
  const [userProfile, setUserProfile] = useState<User>();
  const [follower, setFollowers] = useState<IFollow[]>([]);
  const [followings, setFollowing] = useState<IFollow[]>([]);

  // const { handlerLikeClick } = useThreadCard();

  const fetchData = async () => {
    try {
      const response = await API.get(`/user/${id}`,);
      dispatch(GET_THREADS(response.data.threads));
      console.log("berhasil mendapatkan data", response.data);

      setUserProfile(response.data);


      const follower = await API.get(`/follows?type=followers&user_id=${id}`);
      // dispatch(GET_FOLLOWS(follower.data));
      setFollowers(follower.data);
      console.log("ini follower", follower);

      const following = await API.get(`/follows?type=followings&user_id=${id}`);
      dispatch(GET_FOLLOWS(following.data));
      console.log("ini following", following);
      setFollowing(following.data);

      // const followsData = {
      //   followers: follower.data,
      //   following: following.data,
      // };

      // dispatch(GET_FOLLOWS(followsData));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box id="profile">
        <Box>
          <Card
            borderRadius={"none"}
            borderBottom={"1px"}
            borderX={"1px"}
            borderColor={"GrayText"}
            // width={"44.9em"}
            // height={"430px"}
            bg={"black"}
            // bg={"gray.900"}
            color={"whiteAlpha.800"}
          >
            <CardBody>
              <Heading size="md" mb={2}>
                {userProfile?.full_name} 🔥
              </Heading>
              <Box display={"flex"} flexDirection={"column"}>
                <Image
                  src={userProfile?.profile_background ?? "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"}
                  height={"13em"}
                  objectFit={"cover"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Image
                  src={userProfile?.profile_picture ?? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697414400&semt=ais"}
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
              <Stack spacing="1">
                <Heading size="md">
                  {/* Angga Nur A{" "} */}
                  {userProfile?.full_name}
                  <Icon color={"twitter.500"} as={AiFillCheckCircle}></Icon>
                </Heading>
                <Text>@{userProfile?.username}</Text>
                <Text>{auth.profile_description}</Text>
                <Box display={"flex"}>
                  <Text mr={1}>{follower.length} </Text>
                  <Text mr={5}>Following</Text>
                  <Text mr={1}>{followings.length} </Text>
                  <Text>Follower</Text>
                </Box>
              </Stack>
            </CardBody>
            {/* <Divider /> */}
            {/* <CardFooter></CardFooter> */}
          </Card>
        </Box>
      </Box>
      {threads.map((item, i) => (
        <ThreadCard
          user={item.user}
          key={i}
          id={item.id}
          // author_full_name={item.author_full_name}
          // author_picture={item.author_picture}
          // author_username={item.author_username}
          is_liked={item.is_liked}
          content={item.content}
          image={item.image}
          likes_count={item.likes_count}
          posted_at={item.posted_at}
          replies_count={item.replies_count}
        />
      ))}
    </>
  );
}




