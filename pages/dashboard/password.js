import {
  Alert,
  Button,
  Grid,
  Heading,
  Input,
  Flex,
  Text,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { DashboardLayout } from "@/components/organisms/layout";
import supabase from "@/services/supabase/init";
import strictPassword from "@/utils/strictPassword";

const Password = ({ user, token }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [passwordRequirement, setPasswordRequirement] = useState({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  const validatePassword = (pass) => {
    const result = strictPassword(pass);
    setPasswordRequirement(result);
  };

  const update = async () => {
    if (newPassword == "" || confirmPassword == "" || oldPassword == "") {
      setAlert({
        status: "error",
        text: "Please fill all the fields",
      });
      return;
    }

    if (newPassword !== passwordConfirm) {
      setErrorAlert({
        status: "error",
        text: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    if (!strictPassword(newPassword).isValid) {
      setErrorAlert({
        status: "error",
        text: "Password doesn't meet the requirements",
      });
      setIsLoading(false);
      return;
    }

    const { error, data } = await supabase().auth.api.updateUser(token, {
      password: newPassword,
    });

    if (error) {
      setAlert({ text: error.message, status: "error" });
      return setIsLoading(false);
    }

    if (!error) {
      return location.reload();
    }
  };

  if (user.app_metadata.provider !== "email") {
    return (
      <Heading textColor="gray.600" w="max-content">
        For User Login With Email Only
      </Heading>
    )
  }

  return (
    <>
      <Heading mb={6}>Change Your Password</Heading>

      {alert && (
        <>
          <Alert status={alert.status}>
            <AlertIcon />
            <AlertTitle mr={2}>Whoops!</AlertTitle>
            <AlertDescription>{alert.text}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setAlert(null)}
            />
          </Alert>
        </>
      )}

      <Grid templateColumns="500px" gap={6} mb={6}>
        <Input
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            validatePassword(e.target.value);
          }}
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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </Grid>

      <Button
        isLoading={isLoading}
        loadingText="Changing..."
        colorScheme="red"
        onClick={() => {
          setIsLoading(true);
          update();
        }}
        mr={2}
      >
        Change
      </Button>
    </>
  );
};

Password.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  const token = req.cookies["sb:token"];
  const { user } = await supabase().auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return { props: { user, token } };
}

export default Password;
