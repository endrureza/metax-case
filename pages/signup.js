import { useState } from "react";
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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { session } = useUser();

  if (session) {
    router.push("/dashboard");
  }

  const register = async () => {
    const { error } = await supabase().auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          firstname: "Metax",
          lastname: "Case",
        },
      }
    );

    if (error) {
      setErrorAlert({ ...error, text: error.message, status: "error" });
    } else {
      setErrorAlert({
        ...error,
        text: "Check Your Email to Verify!",
        status: "success",
      });
    }

    setIsLoading(false);
  };

  const registerOauth = async (provider) => {
    const { user, session, error } = await supabase().auth.signIn({
      provider,
    });
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
          Register Your Account
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
            Already have an account?
          </Text>
          <Link href="/signin" passHref>
            <Href fontSize="sm" textColor="gray.500" fontWeight="semibold">
              Log In
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
            register();
          }}
        >
          Create Account
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
          <Button
            colorScheme="facebook"
            mr={2}
            w="100%"
            onClick={() => registerOauth("facebook")}
          >
            Facebook
          </Button>
          <Button
            backgroundColor="blue.500"
            w="100%"
            textColor="white"
            onClick={() => registerOauth("google")}
          >
            Google
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

Signup.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Signup;
