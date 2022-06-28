import Layout from "@components/layout";
import Search from "@components/search";
import ProductCard from "@components/product-card";
import Scene from "@components/scene";
import Banner from "@components/banner";
import Service from "@components/service";
import FeatureCategory from "@components/feature-category";
import OurStory from "@components/our-story";
import {
  SimpleGrid,
  Text,
  Container,
  Stack,
  Flex,
  Button,
  VStack,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFetchProducts, useFetchCategories } from "./api/catalog";
import { toast } from "react-toastify";

const Homepage = () => {
  const [filter, setFilter] = useState([]);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useFetchProducts(filter);

  if (isError) {
    let errorMessage = "Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  }

  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: errorCategory,
  } = useFetchCategories([
    {
      key: "limit",
      value: 6,
    },
  ]);

  if (isError) {
    let errorMessage = "Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  }

  if (isCategoryError) {
    let errorMessage = "Error";
    if (errorCategory instanceof Error) {
      errorMessage = errorCategory.message;
    }
    toast.error(errorMessage);
  }

  const defaultCategories = [
    {
      id: 1,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
    {
      id: 2,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
    {
      id: 3,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
    {
      id: 4,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
    {
      id: 5,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
    {
      id: 6,
      category_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
    },
  ];

  const defaultProducts = [
    {
      id: 1,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
    {
      id: 2,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
    {
      id: 3,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
    {
      id: 4,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
    {
      id: 5,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
    {
      id: 6,
      product_image: {
        url: "https://dcisb67tbokpv.cloudfront.net/default/bag.png",
        alt: "Bag",
      },
      name: "Bag",
      url: "/bag",
      tag: ["Bag"],
    },
  ];

  return (
    <Layout title="" description="printcart catalog website.">
      <Container pt={15}>
        <Search />
      </Container>

      <Container maxW={"7xl"} py={10}>
        <Banner />
      </Container>
      <Container maxW={"7xl"} py={10}>
        <Service />
      </Container>
      <Container maxW={"7xl"} py={10}>
        <Scene title="Bestsellers" align="end">
          <Text fontSize="xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </Text>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            gap={6}
            p={2}
            alignItems="stretch"
            as="section"
          >
            {products &&
              products.data.map((product: any) => (
                <ProductCard data={product} key={product.id} />
              ))}
          </SimpleGrid>
          {isLoading && (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              gap={6}
              p={2}
              alignItems="stretch"
              as="section"
            >
              {defaultProducts.map((product: any) => (
                <Skeleton key={product.id}>
                  <ProductCard data={product} />
                </Skeleton>
              ))}
            </SimpleGrid>
          )}
        </Scene>
      </Container>
      <Container maxW={"7xl"} py={10}>
        <Flex
          w={"full"}
          h={"250px"}
          backgroundImage={"url('assets/images/printing-house.webp')"}
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack maxW={"2xl"} align={"center"} spacing={6}>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
              >
                Print Provider
              </Text>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={"1rem"}
              >
                Printcart is the largest print on demand network
              </Text>
              <Stack direction={"row"}>
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  See print providers
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>
      </Container>
      <Container maxW={"7xl"} py={10}>
        <Scene title="Categories" align="end">
          {categories && (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              gap={6}
              p={2}
              alignItems="stretch"
              as="section"
            >
              {categories.data.map((category: any) => (
                <FeatureCategory data={category} key={category.id} />
              ))}
            </SimpleGrid>
          )}
          {isCategoryLoading && (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              gap={6}
              p={2}
              alignItems="stretch"
              as="section"
            >
              {defaultCategories.map((category: any) => (
                <Skeleton key={category.id}>
                  <FeatureCategory data={category} />
                </Skeleton>
              ))}
            </SimpleGrid>
          )}
        </Scene>
      </Container>
      <Container maxW={"7xl"} py={10}>
        <OurStory />
      </Container>
    </Layout>
  );
};

export default Homepage;
