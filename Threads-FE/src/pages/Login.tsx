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
import { useLogin } from "@/features/auth/hooks/useLogin";

// import { useSelector } from "react-redux";
// import { RootState } from "@/stores/types/rootState";

export default function Login() {
  const {
    handleSubmit,
    changeHandler,
    navigate,
    errorAlert,
    successAlert,
    form,
  } = useLogin();

  // const auth = useSelector((state: RootState) => state.auth);

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
                <Box display={"flex"}>
                  Dont have an account yet ?{" "}
                  <Text
                    color={"twitter.600"}
                    cursor={"pointer"}
                    ml={2}
                    onClick={() => navigate("/registrasi")}
                  >
                    Create One
                  </Text>
                </Box>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
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
