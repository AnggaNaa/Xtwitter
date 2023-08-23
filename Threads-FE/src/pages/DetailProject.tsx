import { Avatar, Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import { ImFilePicture } from "react-icons/im";
import { Link } from "react-router-dom";
import { ChatIcon } from "@chakra-ui/icons";

import {
  AiFillCheckCircle,
  AiFillLike,
  AiOutlineArrowLeft,
} from "react-icons/ai";

import { useReply } from "@/features/auth/hooks/useReply";
import { ThreadCard } from "@/features/thread";

export function DetailProject() {
  // const { id } = useParams();
  // const [Threads, setThread] = useState<ThreadCard>();
  // const [replies, setReplies] = useState<ThreadCard[]>([]);
  // const totalComments = replies.length;

  // const [form, setForm] = useState<IReplyPost>({
  //   content: "",
  //   thread_id: +(id as string),
  // });

  // async function handlePost(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   try {
  //     const response = await API.post("/reply", form);
  //     setForm({
  //       content: "",
  //       thread_id: +(id as string),
  //     });
  //     console.log("berhasil menambahkan reply", response.data);
  //     getReplies();
  //   } catch (err) {
  //     console.log("gagal menambhkan reply", err);
  //   }
  // }

  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  // }

  // async function getThreadById() {
  //   try {
  //     const response = await API.get(`/threads/${id}`);
  //     setThread(response.data);
  //     console.log("berhasil mendapatkan thread", response.data);
  //   } catch (err) {
  //     console.log("gagal mendapatkan thread", err);
  //   }
  // }

  // async function getReplies() {
  //   try {
  //     const response = await API.get(`/replies?threadId=${id}`);
  //     setReplies(response.data);
  //     console.log("ini reply thread", response.data);
  //   } catch (err) {
  //     console.log("gagal mendapatkan replies data by id", err);
  //   }
  // }

  // // const [data, _] = useState(ThreadCard);
  // // const fetchData = async () => {
  // //   try {
  // //     const response = await API.get("/threads");
  // //     setThread(response.data);
  // //   } catch (error) {
  // //     console.error("Error fetching data:", error);
  // //   }
  // // };

  // useEffect(() => {
  //   // fetchData();
  //   getThreadById();
  //   getReplies();
  // }, []);

  // const element = Threads.find((el) => el.id === Number(id));

  const { form, Threads, replies, totalComments, handleChange, handlePost } =
    useReply();

  return (
    <>
      <Box borderX={"1px"} borderColor={"grey"}>
        <Box display={"flex"} alignItems={"center"}>
          <Link to={"/"}>
            <Icon m={2} fontSize={"1.8em"} as={AiOutlineArrowLeft}></Icon>
          </Link>
          <Text as="b" fontSize={"2xl"}>
            Status
          </Text>
        </Box>
        <Box display="flex" pr={6} pt={5}>
          <Avatar name="a" mx={2} src={Threads?.user?.profile_picture} />
          <Box gap={2}>
            <Box display="flex" gap={2} mb={1} alignContent={"center"}>
              <Text as="b">{Threads?.user?.full_name}</Text>
              <Box display={"flex"} alignItems={"center"}>
                <Text style={{ color: "grey" }}>
                  {" "}
                  @{Threads?.user?.username}{" "}
                </Text>
                <Icon
                  fontSize="larger"
                  color="twitter.500"
                  ms={1}
                  as={AiFillCheckCircle}
                ></Icon>
              </Box>
              <Text style={{ color: "grey" }}>{Threads?.posted_at}</Text>
            </Box>
            <Box mb={3}>
              <Text mb={2}>{Threads?.content}</Text>
              <img src={Threads?.image} alt="" />
            </Box>
            <Box mb={5} display={"flex"} alignItems={"center"}>
              <Icon
                cursor={"pointer"}
                fontSize="larger"
                color={"white"}
                mx={1}
                as={AiFillLike}
              ></Icon>
              <Text color="white">{Threads?.likes_count} Like </Text>
              <Box ml={2}>
                <Icon as={ChatIcon} mr={1} />
                {totalComments} Replies
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <ThreadCard
        id={Threads?.id}
        user={Threads?.user}
        content={Threads?.content}
        posted_at={Threads?.posted_at}
        image={Threads?.image}
        likes_count={Threads?.likes_count}
        replies_count={Threads?.replies_count}
        is_liked={Threads?.is_liked}
      /> */}

      <Box>
        <form onSubmit={handlePost} encType="multipart/form-data">
          <Box
            display={"flex"}
            my={5}
            alignItems={"center"}
            p={3}
            m={0}
            border={"1px"}
            borderColor={"grey"}
          >
            <Avatar src="https://berita.yodu.id/wp-content/uploads/2023/05/urutan-nonton-one-piece.png"></Avatar>
            <Input
              placeholder="Type your reply!"
              size="lg"
              border={0}
              name="content"
              value={form.content}
              onChange={handleChange}
            />
            <Icon as={ImFilePicture} fontSize={"1.5em"} mx={4}></Icon>
            <Button
              type="submit"
              size={"sm"}
              borderRadius={"20"}
              px={5}
              colorScheme={"teal"}
              color={"white"}
            >
              Post
            </Button>
          </Box>
        </form>
        <Box>
          {replies?.map((reply) => {
            return (
              <Box key={reply.id} borderX={"1px"} borderColor={"grey"}>
                <Box display="flex" pr={6} pt={5}>
                  <Avatar name="a" mx={2} src={reply.user?.profile_picture} />
                  <Box gap={2}>
                    <Box display="flex" gap={2} mb={1} alignContent={"center"}>
                      <Text as="b">{reply.user?.full_name}</Text>
                      <Box display={"flex"} alignItems={"center"}>
                        <Text style={{ color: "grey" }}>
                          {" "}
                          @{reply.user?.username}{" "}
                        </Text>
                        <Icon
                          fontSize="larger"
                          color="twitter.500"
                          ms={1}
                          as={AiFillCheckCircle}
                        ></Icon>
                      </Box>
                      <Text style={{ color: "grey" }}>{reply.posted_at}</Text>
                    </Box>
                    <Box mb={3}>
                      <Text mb={2}>{reply.content}</Text>
                    </Box>
                    <Box mb={5} display={"flex"} alignItems={"center"}>
                      <Icon
                        cursor={"pointer"}
                        fontSize="larger"
                        mx={1}
                        as={AiFillLike}
                      ></Icon>
                      {/* {reply.likes_count}  */}
                      Like
                      {/* <Button size={"sm"} ml={2} border={"none"}> */}
                      <Box ml={3} cursor={"pointer"}>
                        <Icon as={ChatIcon} mr={2} />
                        {/* {reply.replies_count}  */}
                        Replies
                      </Box>
                      {/* </Button> */}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
  // : (
  //   <h1>Salah Tong !</h1>
  // );
}
