import { FollowCard } from "@/features/follow";
import { API } from "@/lib/api";
import { GET_FOLLOWS, SET_FOLLOW_STATE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Follows() {
  const dispatch = useDispatch();
  const followState = useSelector(
    (state: RootState) => state.follow.followState
  );
  const follows = useSelector((state: RootState) => state.follow.follows);

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    dispatch(GET_FOLLOWS(response.data));
  }
  useEffect(() => {
    getFollowData();
  }, [followState]);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Tabs isFitted variant="enclosed" width="600px" marginTop={"20px"}>
          <TabList mb="1em">
            <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>
              Followers
            </Tab>
            <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>
              Followings
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {follows.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  user_id={follow.user_id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  profile_picture={follow.profile_picture}
                  profile_description={follow.profile_description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {follows.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  user_id={follow.user_id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  profile_picture={follow.profile_picture}
                  profile_description={follow.profile_description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
