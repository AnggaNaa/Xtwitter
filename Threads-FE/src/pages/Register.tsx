"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Link,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { User } from "@/features/thread";
import { API } from "@/lib/api";

interface ICreateUser {
  username: string;
  full_name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const [_, setUser] = useState<User[]>([]);
  const [form, setForm] = useState<ICreateUser>({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const response = await API.get("/user");
      setUser(response.data);
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
      const response = await API.post("/user", {
        username: form.username,
        full_name: form.full_name,
        email: form.email,
        password: form.password,
      });
      console.log(response.data, "ini post");
      setForm({
        username: "",
        full_name: "",
        email: "",
        password: "",
      });
      setSuccessAlert("Registrasi berhasil!");
      setErrorAlert("");

      // toast({
      //   title: "Registrasi Berhasil",
      // });
      fetchData();
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrorAlert(err.response.data.error);
      } else {
        setErrorAlert("Terjadi kesalahan pada server");
      }

      // toast({
      //   title: "Email already exists",
      //   status: "error",
      // });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} width={"100em"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            {errorAlert && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Terjadi Kesalahan</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>
              </Alert>
            )}

            {successAlert && (
              <Alert status="success" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Sukses</AlertTitle>
                <AlertDescription>{successAlert}</AlertDescription>
              </Alert>
            )}

            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  minLength={3}
                  name="username"
                  type="text"
                  onChange={changeHandler}
                  value={form.username}
                />
              </FormControl>

              <FormControl id="firstName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="full_name"
                  type="text"
                  onChange={changeHandler}
                  value={form.full_name}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={changeHandler}
                  value={form.email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={changeHandler}
                    value={form.password}
                    minLength={3}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="login" color={"twitter.500"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
