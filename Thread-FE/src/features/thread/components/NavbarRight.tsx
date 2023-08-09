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

export function NavbarRight() {
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
                  src="https://berita.yodu.id/wp-content/uploads/2023/05/urutan-nonton-one-piece.png"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Image
                  src="https://asset.kompas.com/crops/26yVfPEUtlADYfL6sNGt-9ls3tk=/91x0:1250x773/750x500/data/photo/2023/08/05/64ce32fae37d0.png"
                  height={"100px"}
                  width={"100px"}
                  objectFit={"cover"}
                  mt={-16}
                  ml={3}
                  borderRadius={"50%"}
                  border={"4px solid white"}
                />
                <Box mt={"-7"}>
                  <Button float={"right"}>Edit Profile</Button>
                </Box>
              </Box>
              <Stack mt="2" spacing="2">
                <Heading size="md">
                  Angga Nur A{" "}
                  <Icon color={"twitter.500"} as={AiFillCheckCircle}></Icon>
                </Heading>
                <Text>@anggana</Text>
                <Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                </Text>
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
            <CardFooter></CardFooter>
          </Card>
        </Box>

        <Box p={2}>
          <Card width={"380px"} bg={"gray.900"} color={"whiteAlpha.800"}>
            <CardBody display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"} gap={2}>
                <Text>Developed by Your Name</Text>
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
