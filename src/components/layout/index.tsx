import { Container, ContainerProps, Heading, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { NextSeo } from "next-seo";
import axios from "axios";

type LayoutProps = PropsWithChildren<{ title: string; description: string }>;

const variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -40,
    transition: { duration: 0.4, type: "easeInOut" },
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.4, type: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: -0,
    y: 40,
    transition: { duration: 0.4, type: "easeInOut" },
  },
};

const MotionContainer = motion<ContainerProps>(Container);

const Layout = ({ children, title, description }: LayoutProps) => {
  return (
    <>
      <NextSeo
        title={title ? title : "Home" + " | Printcart Catalog"}
        description={description}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <MotionContainer
        display="flex"
        maxW={{ base: "container.lg", xl: "container.xl" }}
        minH={{ base: "auto", md: "100vh" }}
        px={{ base: 4, lg: 0 }}
        overflow="hidden"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        centerContent
      >
        <Box w="100%" px={4} mb={4}>
          <Heading>{title}</Heading>
        </Box>

        {children}
      </MotionContainer>
    </>
  );
};

export default Layout;
