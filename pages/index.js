import {
  Button,
  Flex,
  Grid,
  Heading,
  Link as Href,
  Text,
} from "@chakra-ui/react";
import { DefaultLayout } from "../components/organisms/layout";
import Link from "next/link";
import useUser from "@/hooks/useUser";

const Home = () => {
  const { user, session } = useUser();

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
          <Href mr="2">Documentation</Href>
          <Href>Github</Href>
        </Flex>
      </Grid>
    </>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
