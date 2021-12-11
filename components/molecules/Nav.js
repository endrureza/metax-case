import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaPowerOff } from "@react-icons/all-files/fa/FaPowerOff";
import firstChar from "@/utils/firstChar";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import supabase from "@/services/supabase/init";
import axios from "axios";

const Nav = () => {
  const { user } = useUser();

  const router = useRouter();

  const logout = async () => {
    await supabase().auth.signOut();
    await axios.post("/api/signout");

    router.reload();
  };

  return (
    <>
      <Flex direction="column" justifyContent="space-between" h="full">
        <Box>
          <Flex p={6} alignItems="center">
            <Box backgroundColor="blue.600" p={4} borderRadius={6} my={2}>
              <Heading textColor="white">
                {firstChar(
                  user?.user_metadata?.firstname +
                    " " +
                    user?.user_metadata?.lastname
                )}
              </Heading>
            </Box>
            <Flex direction="column" py={6} px={4}>
              <Heading size="sm">
                {user?.user_metadata?.firstname +
                  " " +
                  user?.user_metadata?.lastname}
              </Heading>
              <Text fontSize="sm" wordBreak="break-word">
                {user?.email}
              </Text>
            </Flex>
          </Flex>
          <Button
            w="full"
            variant="ghost"
            py={10}
            pr={10}
            pl={6}
            leftIcon={<FaHome />}
            onClick={() => router.push("/")}
            justifyContent="flex-start"
          >
            Front View
          </Button>
        </Box>
        <Button
          variant="ghost"
          py={10}
          pr={10}
          pl={6}
          leftIcon={<FaPowerOff />}
          onClick={() => logout()}
          justifyContent="flex-start"
        >
          Sign out
        </Button>
      </Flex>
    </>
  );
};

export default Nav;
