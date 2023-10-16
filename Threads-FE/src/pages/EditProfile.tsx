"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";
import { User } from "@/features/thread";
import { ChangeEvent, FormEvent, useState } from "react";
import { API } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";

interface IUpdateUser {
  username: string;
  full_name: string;
  profile_description: string;
}

export default function UserProfileEdit() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [_, setUser] = useState<User[]>([]);
  const [form, setForm] = useState<IUpdateUser>({
    username: "",
    full_name: "",
    profile_description: "",
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await API.patch("/user/" + auth.id, form);
      // {
      //   username: form.username,
      //   full_name: form.full_name,
      //   email: form.email,
      //   password: form.password,
      // });
      console.log(response.data, "ini udpate");
      setForm({
        username: "",
        full_name: "",
        profile_description: "",
      });
      navigate("/");
    } catch (error) {
      console.log("ini eror profile :", error);
      // setErrorAlert((prevAlerts) => [
      //   ...prevAlerts,
      //   { message: "Email already exists" },
      // ]);
    }

    // toast({
    //   title: "Email already exists",
    //   status: "error",
    // });
    // }
  };

  return (
    <FormControl>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>

          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={auth.profile_picture}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Input type="file" ></Input>
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
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
          <FormControl id="full_name" isRequired>
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
          <FormControl id="description" isRequired>
            <FormLabel>Profile Description</FormLabel>
            <Input
              placeholder={auth.profile_description}
              name="profile_description"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={changeHandler}
              value={form.profile_description}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </FormControl>
  );
}
