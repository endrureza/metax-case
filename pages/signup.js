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
import strictPassword from "@/utils/strictPassword";
import validateEmail from "@/utils/validateEmail";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorAlert, setErrorAlert] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { session } = useUser();
  const [passwordRequirement, setPasswordRequirement] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  if (session) {
    router.push("/dashboard");
  }

  const validatePassword = (pass) => {
    const result = strictPassword(pass);
    setPasswordRequirement(result);
  };

  const register = async () => {
    if (email == "" || password == "" || passwordConfirm == "") {
      setErrorAlert({
        status: "error",
        text: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorAlert({
        status: "error",
        text: "Please enter a valid email",
      });
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setErrorAlert({
        status: "error",
        text: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    if (!strictPassword(password).isValid) {
      setErrorAlert({
        status: "error",
        text: "Password doesn't meet the requirements",
      });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase().auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          firstname: "Metax",
          lastname: "Case",
          pass: password,
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
          onChange={(e) => {
            setPassword(e.target.value)
            validatePassword(e.target.value)
          }}
          type="password"
        />
        <Flex direction="column">
          <Text
            fontSize="xs"
            textColor={passwordRequirement.length ? "green.400" : "red.400"}
            fontWeight="semibold"
          >
            Password should contain at least 8 characters
          </Text>
          <Text
            fontSize="xs"
            textColor={passwordRequirement.upper ? "green.400" : "red.400"}
            fontWeight="semibold"
          >
            Password should contain at least one upper character
          </Text>
          <Text
            fontSize="xs"
            textColor={passwordRequirement.lower ? "green.400" : "red.400"}
            fontWeight="semibold"
          >
            Password should contain at least one lower characters
          </Text>
          <Text
            fontSize="xs"
            textColor={passwordRequirement.number ? "green.400" : "red.400"}
            fontWeight="semibold"
          >
            Password should contain at least one digit characters
          </Text>
          <Text
            fontSize="xs"
            textColor={passwordRequirement.special ? "green.400" : "red.400"}
            fontWeight="semibold"
          >
            Password should contain at least one special characters
          </Text>
        </Flex>
        <Input
          placeholder="Confirm Password..."
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
