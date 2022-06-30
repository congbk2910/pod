import Footer from "@components/main-layout/footer";
import Header from "@components/main-layout/header";
import CookiePreference from "@components/cookie-preference";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  ContainerProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

const MotionContainer = motion<ContainerProps>(Container);

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

const PageBreadcrumb = ({ slug }: any) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const MainLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { slug }: any = router.query;

  return (
    <>
      <Header />
      <Box as="main" pt={"62px"}>
        {slug && (
          <MotionContainer
            px={4}
            my={2}
            maxW="7xl"
            display="flex"
            overflow="hidden"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
          >
            <PageBreadcrumb slug={slug} />
          </MotionContainer>
        )}
        {children}
      </Box>
      <Footer />
      <CookiePreference />
    </>
  );
};

export default MainLayout;
