import { ChakraProvider } from "@chakra-ui/react";
import AuthContext from "@/context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthContext>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </AuthContext>
  );
}

export default MyApp;
