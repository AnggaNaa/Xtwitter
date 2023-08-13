"use client";

import { User } from "@/features/thread";
import { API } from "@/lib/api";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const [_, setUser] = useState<User[]>([]);
  const [form, setForm] = useState<ILogin>({
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
      const response = await API.post("/login", {
        email: form.email,
        password: form.password,
      });
      // Lakukan sesuatu setelah berhasil login, misalnya redirect atau menyimpan token
      console.log(response.data, "ini post");

      setForm({
        email: "",
        password: "",
      });
      setSuccessAlert("Registrasi berhasil!");
      setErrorAlert("");

      // toast({
      //   title: "Registrasi Berhasil",
      // });
      // fetchData();
    } catch (err: any) {
      if (err.response && err.response.data) {
        setErrorAlert(err.response.data.error);
      } else {
        setErrorAlert("Terjadi kesalahan pada server");
      }

      console.log(err);
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
