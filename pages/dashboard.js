import {
  Alert,
  Button,
  Grid,
  Heading,
  Input,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/organisms/layout";
import supabase from "@/services/supabase/init";

const Dashbord = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setFirstName(user?.user_metadata?.firstname);
    setLastName(user?.user_metadata?.lastname);
  }, [user]);

  const update = async () => {
    const { user, error } = await supabase().auth.update({
      data: {
        firstname: firstName,
        lastname: lastName,
      },
    });

    if (error) {
      setAlert(error.message);
      return setIsLoading(false);
    }

    if (!error) {
      return location.reload();
    }
  };

  return (
    <>
      <Heading mb={6}>
        Welcome,{" "}
        {user?.user_metadata?.firstname + " " + user?.user_metadata?.lastname}
      </Heading>

      {alert && (
        <>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Whoops!</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setAlert({})}
            />
          </Alert>
        </>
      )}

      <Grid templateColumns="500px" gap={6} mb={6}>
        <Input
          placeholder="Your Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Your Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>

      <Button
        isLoading={isLoading}
        loadingText="Updating..."
        colorScheme="red"
        onClick={() => {
          setIsLoading(true);
          update();
        }}
      >
        Update
      </Button>
    </>
  );
};

Dashbord.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase().auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return { props: { user } };
}

export default Dashbord;
