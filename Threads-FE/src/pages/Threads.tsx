import { IThreadPost, ThreadCard } from "@/features/thread/components";
import { API } from "@/lib/api";
import { GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  useToast,
  Image,
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

export default function UseThreads() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [Threads, setThread] = useState<ThreadCard[]>([]);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);
  // const user = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");

  // const fetchData = async () => {
  //   try {
  //     const response = await API.get("/threads", {
  //       headers: {
  //         token: `Bearer ${localStorage.token}`,
  //       },
  //     });
  //     setThread(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  async function getThreads() {
    const response = await API.get("/threads");
    console.log("ini data", response.data);

    dispatch(GET_THREADS(response.data));
  }

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      console.log("ini files", files[0]);
      const image = URL.createObjectURL(files[0]);
      setPreviewImage(image);
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      console.log("ini value", value);
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", form.content);
    if (form.image) {
      formData.append("image", form.image as string);
    }
    try {
      const response = await API.post("/threads", formData);
      // dispatch(GET_THREADS(response.data));

      console.log(response.data, "ini post");
      setForm({
        content: "",
        image: "",
      });

      setPreviewImage("");

      setTimeout(() => {
        getThreads();
      }, 5000);

    } catch (err) {
      console.log("ini eror", err);
      toast({
        title: "Coba Lagi",
        status: "error",
      });
    }
  };

  const handleInputClick = () => {
    onOpen();
  };

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      <Flex
        my={5}
        alignItems={"center"}
        p={3}
        m={0}
        borderX={"1px"}
        borderColor={"grey"}
      >
        <form encType="multipart/form-data">
          {/* <Button onClick={() => console.log("ini user", user)}>
            INI BUTTON
          </Button> */}
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
                  // name="content"
                  // value={inputValue}
                  // onChange={changeHandler}
                  onClick={handleInputClick}
                  placeholder="What is happening ?!"
                  width={"30em"}
                  border={0}
                  required
                />
              </FormControl>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalHeader>Form Post Thread</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex
                      my={5}
                      alignItems={"center"}
                      p={3}
                      m={0}
                    // borderX={"1px"}
                    // borderColor={"grey"}
                    >
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <Flex flexDirection={"column"}>
                          <Flex>
                            <Box>
                              <Avatar
                                name="a"
                                src={auth.profile_picture}
                              ></Avatar>
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
                                  width={"20em"}
                                  py={7}
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
                          </Flex>
                          <FormControl
                            id="image"
                            mr={"10em"}
                            mt={"3em"}
                            display={"flex"}
                            justifyContent={"space-between"}
                            borderTop={"1px"}
                            borderColor={"grey"}
                            pt={5}
                          >
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
                              onClick={onClose}
                            >
                              Post
                            </Button>
                          </FormControl>
                        </Flex>
                      </form>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>

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
                // type="submit"
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
      </Flex>

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
