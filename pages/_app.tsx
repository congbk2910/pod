import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ApiProvider } from "./api/api";
import MainLayout from "@components/main-layout";
import { AnimatePresence } from "framer-motion";
import { CookiesProvider } from "react-cookie";
import Router from "next/router";
import { Spinner, Center } from "@chakra-ui/react";

const queryClient = new QueryClient();

function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ApiProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CookiesProvider>
            <MainLayout>
              <AnimatePresence exitBeforeEnter initial={true}>
                {/* {loading ? (
                  <Center h="50vh">
                    <Spinner />
                  </Center>
                ) : ( */}
                <Component
                  {...pageProps}
                  key={router.route}
                  loading={loading}
                />
                {/* )} */}
              </AnimatePresence>
            </MainLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </CookiesProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </ApiProvider>
  );
}

export default App;
