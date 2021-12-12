import {
  Button,
  Flex,
  Grid,
  Heading,
  Link as Href,
  Text,
  Input,
} from "@chakra-ui/react";
import { DefaultLayout } from "../components/organisms/layout";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import supabase from "@/services/supabase/init";

const Home = () => {
  const { user, session } = useUser();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = async () => {
    await supabase().auth.update({
      data: {
        firstname,
        lastname,
      },
    });

    location.reload();
  };

  if (
    session &&
    user?.user_metadata?.firstname == undefined &&
    user?.user_metadata?.lastname == undefined
  ) {
    return (
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
          Fill In Your First & Last Name
        </Heading>
        <Input
          placeholder="Your Firstname..."
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          placeholder="Your Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <Button
          isLoading={isLoading}
          loadingText="Saving..."
          colorScheme="red"
          maxW="150px"
          onClick={() => {
            setIsLoading(true);
            update();
          }}
        >
          Save
        </Button>
      </Grid>
    );
  }

  return (
    <>
      <Grid templateColumns="repeat(1fr, minmax(0, 1))" gap={6}>
        <Flex bgColor="gray.100" justify="space-between" align="center" p={4}>
          {!session && (
            <>
              <Text flex={1} as="p" fontSize="sm">
                You are not signed in
              </Text>
              <Link href="/signin" passHref>
                <Href textColor="green" mr={4}>
                  Sign In
                </Href>
              </Link>
              <Link href="/signup" passHref>
                <Button colorScheme="green">Sign Up</Button>
              </Link>
            </>
          )}

          {session && (
            <>
              <Text as="p" fontSize="sm">
                Hello,{" "}
                {user?.user_metadata?.firstname +
                  " " +
                  user?.user_metadata?.lastname}
              </Text>
              <Link href="/dashboard" passHref>
                <Button colorScheme="green">Dashboard</Button>
              </Link>
            </>
          )}
        </Flex>
        <Heading as="h6" size="lg">
          MetaX Case SignIn & SignUp
        </Heading>
        <Text as="p" fontSize="sm">
          This is a test case for SignIn & SignUp User
        </Text>
        <hr />
        <Flex align="center">
          <Href href="https://github.com/endrureza/metax-case" mr="2">Documentation</Href>
          <Href href="https://github.com/endrureza/metax-case">Github</Href>
        </Flex>
      </Grid>
    </>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
