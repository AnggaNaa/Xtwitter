import { ThreadCard } from "@/features/thread/components";
import { API } from "@/lib/api";
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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";

export function Threads() {
  const toast = useToast();
  const [Threads, setThread] = useState<ThreadCard[]>([]);
  const [form, setForm] = useState({
    content: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await API.get("/threads", {
        headers: {
          token: `Bearer ${localStorage.token}`,
        },
      });
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      formData.append("image", form.image);
    }
    try {
      const response = await API.post("/threads", formData);

      console.log(response.data, "ini post");
      setForm({
        content: "",
        image: null,
      });

      setPreviewImage("");
      fetchData();
    } catch (err) {
      console.log("ini eror", err);
      toast({
        title: "Coba Lagi",
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Flex>
            <Box>
              <Avatar name="a" src={Threads[0]?.user?.profile_picture}></Avatar>
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
      </Flex>

      {Threads.map((item, i) => (
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
