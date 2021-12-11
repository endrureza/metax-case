import { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Link as Href,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { DefaultLayout } from "../components/organisms/layout";
import Link from "next/link";
import supabase from "@/services/supabase/init";
import isEmpty from "@/utils/isEmpty";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { session } = useUser();

  if (session) {
    router.push("/dashboard");
  }

  const login = async () => {
    if (email === "" || password === "") {
      setErrorAlert({
        ...error,
        text: "email / password is required!",
        status: "error",
      });

      return setIsLoading(false);
    }

    const { user, session, error } = await supabase().auth.signIn({
      email: email,
      password: password,
    });

    if (session) {
      router.push("/dashboard");
    }

    if (error) {
      setErrorAlert({ ...error, text: error.message, status: "error" });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Grid
        templateColumns="repeat(1fr, minmax(0, 1))"
        gap={6}
        p={6}
        borderWidth={2}
        borderRadius="md"
        mt="25%"
        top={0}
      >
        <Heading as="h6" size="lg">
          Sign In With Your Account
        </Heading>
        {!isEmpty(errorAlert) && (
          <>
            <Alert status={errorAlert.status}>
              <AlertIcon />
              <AlertTitle mr={2}>Whoops!</AlertTitle>
              <AlertDescription>{errorAlert.text}</AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setErrorAlert({})}
              />
            </Alert>
          </>
        )}
        <Input
          placeholder="Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Flex>
          <Text as="p" fontSize="sm" textColor="gray.500" mr={1}>
            {"Don't have an account yet?"}
          </Text>
          <Link href="/signup" passHref>
            <Href fontSize="sm" textColor="gray.500" fontWeight="semibold">
              Sign Up
            </Href>
          </Link>
        </Flex>
        <Button
          isLoading={isLoading}
          loadingText="Creating..."
          colorScheme="red"
          maxW="150px"
          onClick={() => {
            setIsLoading(true);
            login();
          }}
        >
          Sign In
        </Button>
        <Flex alignItems="center">
          <Divider />
          <Text
            as="p"
            fontSize="sm"
            textAlign="center"
            mx={2}
            textColor="gray.500"
          >
            or
          </Text>
          <Divider />
        </Flex>
        <Flex>
          <Button colorScheme="facebook" mr={2} w="100%">
            Facebook
          </Button>
          <Button backgroundColor="blue.500" w="100%" textColor="white">
            Google
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

Signin.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Signin;
