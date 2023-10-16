// import { useThreadCard } from "@/features/auth/hooks/useThread";
import { ThreadCard } from "@/features/thread";
import { API } from "@/lib/api";
import { GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
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
import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
// import { AiFillCheckCircle, AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// const threads = [
//   { id: 1, title: "Thread Pertama", content: "Isi dari thread pertama." },
//   { id: 2, title: "Thread Kedua", content: "Isi dari thread kedua." },
//   // Tambahkan thread lainnya di sini
// ];

// export const UserProfile = () => {
export default function UserProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  // const user = useSelector((state: RootState) => state.user.userThreads);
  const dispatch = useDispatch();

  const threads = useSelector((state: RootState) => state.thread.threads);
  // const { handlerLikeClick } = useThreadCard();

  const fetchData = async () => {
    try {
      const response = await API.get("/user/" + auth.id);
      dispatch(GET_THREADS(response.data.threads));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box>
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
                {auth.full_name} 🔥
              </Heading>
              <Box display={"flex"} flexDirection={"column"}>
                <Image
                  src={auth.profile_background}
                  height={"13em"}
                  objectFit={"cover"}
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
              <Stack spacing="1">
                <Heading size="md">
                  {/* Angga Nur A{" "} */}
                  {auth.full_name}
                  <Icon color={"twitter.500"} as={AiFillCheckCircle}></Icon>
                </Heading>
                <Text>@{auth.username}</Text>
                <Text>{auth.profile_description}</Text>
                <Box display={"flex"}>
                  <Text mr={1}>111 </Text>
                  <Text mr={5}>Following</Text>
                  <Text mr={1}>291 </Text>
                  <Text> Follower</Text>
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

    // <Box position={"fixed"} mx="4">
    //   <Box>
    //     <Card
    //       borderRadius={"none"}
    //       borderBottom={"1px"}
    //       borderX={"1px"}
    //       borderColor={"GrayText"}
    //       width={"45em"}
    //       height={"430px"}
    //       bg={"black"}
    //       // bg={"gray.900"}
    //       color={"whiteAlpha.800"}
    //     >
    //       <CardBody>
    //         <Heading size="md" mb={2}>
    //           {auth.full_name} 🔥
    //         </Heading>
    //         <Box display={"flex"} flexDirection={"column"}>
    //           <Image
    //             src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    //             height={"13em"}
    //             objectFit={"cover"}
    //             alt="Green double couch with wooden legs"
    //             borderRadius="lg"
    //           />
    //           <Image
    //             src={auth.profile_picture}
    //             height={"100px"}
    //             width={"100px"}
    //             objectFit={"cover"}
    //             mt={-16}
    //             ml={3}
    //             borderRadius={"50%"}
    //             border={"4px solid white"}
    //           />
    //           <Box mt={"-7"}>
    //             <Link to={"/myprofile/" + auth.id}>
    //               <Button float={"right"}>Edit Profile</Button>
    //             </Link>
    //           </Box>
    //         </Box>
    //         <Stack spacing="1">
    //           <Heading size="md">
    //             {/* Angga Nur A{" "} */}
    //             {auth.full_name}
    //             <Icon color={"twitter.500"} as={AiFillCheckCircle}></Icon>
    //           </Heading>
    //           <Text>@{auth.username}</Text>
    //           <Text>{auth.profile_description}</Text>
    //           <Box display={"flex"}>
    //             <Text mr={1}>111 </Text>
    //             <Text mr={5}>Following</Text>
    //             <Text mr={1}>291 </Text>
    //             <Text> Follower</Text>
    //           </Box>
    //         </Stack>
    //       </CardBody>
    //       {/* <Divider /> */}
    //       <CardFooter></CardFooter>
    //     </Card>
    //   </Box>

    // </Box>
  );
}

// export default UserProfile;

{
  /* <Box bg="black" minH="100vh" borderX={"1px solid"}>
      {/* Header */
}
// <Flex
//   bgImage={
//     "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
//   }
//   bgSize="cover"
//   justify="center"
//   align="center"
//   //   bg="blue.500"
//   h="24em"
// >
//   <Image
//     //   mt={"-10em"}
//     borderRadius="full"
//     boxSize="8em"
//     src="https://images.unsplash.com/photo-1544890225-2f3faec4cd60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
//     alt="Foto Profil"
//     ml="-23em"
//   />
// </Flex>

{
  /* Informasi Pengguna */
}
// <Box
//   // bg={"blackAlpha.500"}
//   color={"whiteAlpha.800"}
//   mt="-10em"
//   pt="3em"
//   pb={"1em"}
//   bg="black"
//   // borderRadius="lg"
//   boxShadow="md"
// >
//   <VStack spacing="1em">
//     <Heading as="h1" size="lg">
//       {auth.full_name}
//     </Heading>
//     <Text mt={"-1em"}>@{auth.username}</Text>
//     <Text>Email: {auth.email}</Text>
//     <Text>{auth.profile_description}</Text>
//     {/* Tambahkan informasi lainnya */}
//   </VStack>
// </Box>

// {/* Daftar Thread */}
// <Box
//   color={"black"}
//   mt="1em"
//   p="1em"
//   bg="white"
//   borderRadius="lg"
//   boxShadow="md"
// >
//   <VStack align="start" spacing="1em">
//     <Heading as="h2" size="md">
//       Thread yang Dibuat
//     </Heading>
//     {threads.map((thread) => (
//       <Box>
//         <Box
//           border={"1px"}
//           borderColor={"grey"}
//           display="flex"
//           pr={6}
//           pt={5}
//         >
//           <Avatar name="a" mx={2} src={auth.profile_picture} />
//           <Box gap={2}>
//             <Box display="flex" gap={2} mb={1} alignContent={"center"}>
//               <Text as="b">{auth.full_name}</Text>
//               <Box display={"flex"} alignItems={"center"}>
//                 <Text style={{ color: "grey" }}> @{auth.username} </Text>
//                 <Icon
//                   fontSize="larger"
//                   color="twitter.500"
//                   ms={1}
//                   as={AiFillCheckCircle}
//                 ></Icon>
//               </Box>
//               {/* <Text style={{ color: "grey" }}>{thread.posted_at}</Text> */}
//             </Box>
//             <Box mb={3}>
//               <Link to={"detail/" + thread.id}>
//                 <Text mb={2}> {thread.content}</Text>
//               </Link>
//               {/* <Image src={auth.image} alt="" /> */}
//             </Box>
//             <Box mb={5} display={"flex"} alignItems={"center"}>
//               <Icon
//                 // cursor={"pointer"}
//                 // onClick={() =>
//                 //   handlerLikeClick(thread.id, thread.is_liked)
//                 // }
//                 // color={thread.is_liked ? "twitter.700" : "white"}
//                 fontSize="larger"
//                 mx={1}
//                 as={AiFillLike}
//               ></Icon>
//               {/* <Text color="white"> {thread.likes_count} Like </Text> */}
//               {/* <Link to={"detail/" + thread.id}> */}
//               <Button
//                 size={"sm"}
//                 ml={2}
//                 color="white"
//                 colorScheme="blackAlpha"
//                 onClick={() => `/threads/${thread.id}`}
//               >
//                 <Icon as={ChatIcon} mr={2} color={"white"} />
//                 {/* {thread.replies_count} Replies */}
//               </Button>
//               {/* </Link> */}
//             </Box>
//           </Box>
//         </Box>
//       </Box> */}

// <Box
//   key={thread.id}
//   p="1em"
//   border="1px"
//   borderColor="gray.300"
//   borderRadius="md"
// >
//   <Heading as="h3" size="sm">
//     {thread.author_full_name}
//   </Heading>
//   <Text>{thread.content}</Text>
// </Box>
//       ))}
//     </VStack>
//   </Box>
// </Box>

// import { useState } from "react";
// import {
//   Button,
//   Input,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
// } from "@chakra-ui/react";

// function MyComponent() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [inputValue, setInputValue] = useState("");

//   const handleInputClick = () => {
//     onOpen();
//   };

//   return (
//     <div>
//       <Input value={inputValue} onClick={handleInputClick} />
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent width={"1000px"} height={"20em"}>
//           <ModalHeader>Form Pop-Up</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* Isi form di sini */}
//             <Input placeholder="Contoh input form" />
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Tutup
//             </Button>
//             <Button variant="ghost">Simpan</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// export default MyComponent;

{
  /* <Flex
        my={5}
        alignItems={"center"}
        p={3}
        m={0}
        borderX={"1px"}
        borderColor={"grey"}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Button onClick={() => console.log("ini user", user)}>
            INI BUTTON
          </Button>
          <Flex>
            <Box>
              <Avatar name="a" src={auth.profile_picture}></Avatar>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <FormControl>
                <Input
                  name="content"
                  value={form.content}
                  onChange={changeHandler}
                  placeholder="What is happening ?!"
                  width={"30em"}
                  border={0}
                  required
                />
              </FormControl>
              {previewImage && (
                <Image
                  objectFit={"contain"}
                  width={"100%"}
                  height={"15em"}
                  mt={"1em"}
                  src={previewImage}
                />
              )}
            </Box>
            <FormControl id="image" mr={"20em"} display={"flex"}>
              <FormLabel width={"0.5em"}>
                <Icon
                  cursor={"pointer"}
                  as={ImFilePicture}
                  fontSize={"1.5em"}
                  mx={4}
                  mt={1}
                ></Icon>
              </FormLabel>

              <Input
                type="file"
                name="image"
                // value={form.image}
                onChange={changeHandler}
                placeholder="What is ur image ?!"
                width={"0"}
                border={0}
                accept="image/*"
                hidden
              />
              <Button
                ml={10}
                type="submit"
                size={"sm"}
                borderRadius={"20"}
                px={5}
                bg={"teal"}
                colorScheme="teal"
                color={"white"}
              >
                Post
              </Button>
            </FormControl>
          </Flex>
        </form>
      </Flex> */
}
