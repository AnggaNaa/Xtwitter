import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/lib/api";
import {
  Box,
  Button,
  Input,
  Image,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IAUTH } from "@/interface/auth";
import { GET_FOLLOWS } from "@/stores/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { IFollow } from "@/interface/follow";
import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import useFollowHandler from "@/features/hooks/useFollow";
import { Link } from "react-router-dom";
import { User } from "@/features/thread";

// interface User {
//   id: number;
//   fullname: string;
//   // ... tambahkan properti lain yang diperlukan
// }

// const SearchUser: React.FC = () => {
export function SearchUser() {
  const [searchQuery, setSearchQuery] = useState("");
  //   const [users, setUsers] = useState<IAUTH[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [follow, setFollow] = useState<IFollow[]>([]);
  console.log("users", users)
  const auth = useSelector((state: RootState) => state.auth);
  const follows = useSelector((state: RootState) => state.follow.follows);


  const dispatch = useDispatch();

  const followState = useSelector(
    (state: RootState) => state.follow.followState
  );



  const { isLoading, handleFollow } = useFollowHandler();

  const handleSearch = async () => {
    try {
      const response = await API.get(`/user/search?query=${searchQuery}`);
      setUsers(response.data);

    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }


  useEffect(() => {
    handleSearch();
    getFollowData();
  }, [followState]);

  return (
    <Box mt={5}>
      <Flex>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by name..."
          />
        </InputGroup>

        <Button type="submit" bgColor={"teal"} onClick={handleSearch}>
          Search
        </Button>
      </Flex>

      <>
        {users.map((user) => (
          <Box key={user.id} display={"flex"} width="100%" padding={"20px 0px"}>
            <Image
              src={user.profile_picture ?? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697414400&semt=ais"}
              width={"50px"}
              height={"50px"}
              objectFit={"cover"}
              borderRadius={"50%"}
              marginRight={"20px"}
              alt="user_profile_image"
            />

            <Box display={"flex"} width={"100%"}>
              <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
                <Box display={"flex"}>
                  <Link to={`/profile/${user.id}`}>
                    <Text>{user.full_name}</Text>
                  </Link>
                </Box>
                <Text color="brand.grey">@{user.username}</Text>
                <Text>Tes Doeloe</Text>
              </Box>
              <Box flex={1} display="flex" justifyContent={"flex-end"}>
                <Button
                  // onClick={handleFollow} isLoading={isLoading}

                  // onClick={() =>
                  //   handleFollow(auth.id, user.id, follows.filter((follow: IFollow) => follow.user_id === user.id).length > 0)
                  // }
                  onClick={() => handleFollow(auth.id, user.id, follows.some(follow => follow.user_id === user.id))}
                  isLoading={isLoading}
                >
                  {follows.some(follow => follow.user_id === user.id) ? "Unfollow" : "Follow"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </>
    </Box>
  );
}

// export default SearchUser;
