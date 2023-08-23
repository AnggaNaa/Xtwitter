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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRegister } from "@/features/auth/hooks/useRegister";

export default function SignUp() {
  const {
    form,
    handleSubmit,
    changeHandler,
    setShowPassword,
    errorAlert,
    successAlert,
    showPassword,
  } = useRegister();

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
            {errorAlert.map((alert, index) => (
              <Alert key={index} status="error" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>There is an error</AlertTitle>

                <AlertDescription>{alert as string}</AlertDescription>
              </Alert>
            ))}
            {/* {errorAlert && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Terjadi Kesalahan</AlertTitle>
                <AlertDescription>{errorAlert.message}</AlertDescription>
              </Alert>
            )} */}

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
