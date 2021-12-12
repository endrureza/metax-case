import { ChakraProvider } from "@chakra-ui/react";
import AuthContext from "@/context/AuthContext";
import 'nprogress/nprogress.css'
import NProgress from "nprogress";
import Router from "next/router";
import { useEffect } from "react";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: true,
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    Router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, []);

  return (
    <AuthContext>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </AuthContext>
  );
}

export default MyApp;
