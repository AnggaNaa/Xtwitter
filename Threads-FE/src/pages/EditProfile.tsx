import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  CardBody,
  Box,
  Card,
  Image,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { ChangeEvent, FormEvent, useState } from "react";
import { API } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_CHECK } from "@/stores/rootReducer";

interface IUpdateUser {
  username?: string;
  full_name?: string;
  profile_description?: string;
  profile_background?: File | string;
  profile_picture?: File | string;
}

export default function UserProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState<IUpdateUser>({
    username: auth.username,
    full_name: auth.full_name,
    profile_description: auth.profile_description,
    profile_background: auth.profile_background || "",
    profile_picture: auth.profile_picture || "",
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value, files } = event.target;
    if (files) {
      console.log("ini files", files[0]);

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
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "profile_picture" || key === "profile_background") {
          if (typeof value !== "string") {
            return formData.append(key, value);
          }
        }

        formData.append(key, value)
      })

      console.log(formData, "ini Form Data");



      const response = await API.patch("/user/" + auth.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data, "ini udpate");
      const responseCheckAuth = await API.get("/auth/check");
      dispatch(AUTH_CHECK(responseCheckAuth.data));

      navigate("/");
    } catch (error) {
      console.log("ini eror profile :", error);

    }


  };

  const [_, setUserIconPreview] = useState(null);
  const [, setBackgroundPreview] = useState(null);

  const handleUserChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setUserIconPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setBackgroundPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUserPreview = () => {
    // setUserIconPreview(null);
    setForm({ ...form, profile_picture: auth.profile_picture });

  };
  const clearBackgroundPreview = () => {
    // setBackgroundPreview(null);
    setForm({ ...form, profile_background: auth.profile_background });
  };

  const combinedIconChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeHandler(event); // Memanggil changeHandler
    handleUserChange(event); // Memanggil handleUserChange
  };

  const combinedBackgroundChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changeHandler(event); // Memanggil changeHandler
    handleBackgroundChange(event); // Memanggil handleUserChange
  };

  return (
    <>
      < Flex
        align={"center"}
        justify={"center"}
        backgroundColor={"black"}
      >
        <Stack
          spacing={2}
          w={"full"}
          rounded={"xl"}
          boxShadow={"lg"}
          px={6}
          py={5}
          my={1}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Profile Edit
          </Heading>
          <Card
            height={"16em"}
            bg={"gray.900"}
            color={"whiteAlpha.800"}
          >
            <CardBody>

              <Box display={"flex"} flexDirection={"column"}>
                <Image
                  // src={typeof form.profile_background === "string" ? form.profile_background : URL.createObjectURL(form.profile_background as File)}
                  src={typeof form.profile_background === "string" ? form.profile_background : URL.createObjectURL(form.profile_background as File)}
                  height={"13em"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"

                />
                <Box
                  w={1}
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-15em"
                  right={"-43em"}
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={clearBackgroundPreview}
                />

                <Avatar size="xl" src={typeof form.profile_picture === "string" ? form.profile_picture : URL.createObjectURL(form.profile_picture as File)}
                  top={-16}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={clearUserPreview}
                  />
                </Avatar>



              </Box>

            </CardBody>
          </Card>

          < form onSubmit={handleSubmit} encType="multipart/form-data">
            <FormControl id="userIcon" >
              <FormLabel textAlign={"center"} bg={"whiteAlpha.200"} w={"full"} py={3} borderRadius={"md"} cursor={"pointer"}> Change Icon </FormLabel>
              < Input type="file" w="full" accept="image/*" name="profile_picture" onChange={combinedIconChangeHandler} hidden />
            </FormControl>
            <FormControl id="backgroundIcon" >
              <FormLabel textAlign={"center"} bg={"whiteAlpha.200"} w={"full"} py={3} borderRadius={"md"} cursor={"pointer"}> Change Background Icon </FormLabel>
              < Input type="file" w="full" accept="image/*" name="profile_background" onChange={combinedBackgroundChangeHandler} hidden />
            </FormControl>
            <FormControl id="userName" >
              <FormLabel>User name</FormLabel>
              <Input
                placeholder={auth.username}
                name="username"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={changeHandler}
                value={form.username}
              />
            </FormControl>
            <FormControl id="full_name" >
              <FormLabel>Full name</FormLabel>
              <Input
                placeholder={auth.full_name}
                name="full_name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={changeHandler}
                value={form.full_name}
              />
            </FormControl>
            <FormControl id="description" >
              <FormLabel>Profile Description</FormLabel>
              <Input
                name="profile_description"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={changeHandler}
                value={form.profile_description}
              />
            </FormControl>
            <Stack spacing={6} mt={2} direction={["column", "row"]}>
              <Link to={"/"}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              // onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </>
  );
}
