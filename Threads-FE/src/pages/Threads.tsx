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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ImFilePicture } from "react-icons/im";

interface IthreadsPost {
  content: string;
  image: string;
}

export function Threads() {
  // const [data, _] = useState(Data);

  const toast = useToast();
  const [Threads, setThread] = useState<ThreadCard[]>([]);
  const [form, setForm] = useState<IthreadsPost>({
    content: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const response = await API.get("/threads");
      setThread(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await API.post("/threads/create", {
        content: form.content,
        image: form.image,
      });
      console.log(response.data, "ini post");
      setForm({
        content: "",
        image: "",
      });
      toast({
        title: "Threads",
      });
      fetchData();
    } catch (err) {
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
        <Avatar src="https://berita.yodu.id/wp-content/uploads/2023/05/urutan-nonton-one-piece.png"></Avatar>
        <form onSubmit={handleSubmit}>
          <Flex>
            <FormControl>
              <Input
                name="content"
                value={form.content}
                onChange={changeHandler}
                placeholder="What is happening ?!"
                // size="lg"
                width={"30em"}
                border={0}
                required
              />
            </FormControl>

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
                value={form.image}
                onChange={changeHandler}
                placeholder="What is ur image ?!"
                // size="lg"
                width={"0"}
                border={0}
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

      {Threads.map((dummy, i) => (
        <ThreadCard
          user={dummy.user}
          key={i}
          id={dummy.id}
          // author_full_name={dummy.author_full_name}
          // author_picture={dummy.author_picture}
          // author_username={dummy.author_username}
          content={dummy.content}
          image={dummy.image}
          likes_count={dummy.likes_count}
          posted_at={dummy.posted_at}
          replies_count={dummy.replies_count}
        />
      ))}
    </>
  );
}
