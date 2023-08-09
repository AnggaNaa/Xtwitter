import { NavbarLeft, NavbarRight } from "@/features/thread/components";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Box bg={"black"} color={"whiteAlpha.800"}>
        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem colSpan={1}>
            <NavbarLeft />
          </GridItem>

          <GridItem colSpan={2} mr={10}>
            <Outlet />
          </GridItem>

          <GridItem colSpan={1} ml={-6}>
            <NavbarRight />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

// export default Home;
