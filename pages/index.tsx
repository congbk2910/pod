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
} from "@chakra-ui/react";

const Homepage = ({ products, categories, query, loading }: any) => {
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
          {products && (
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              gap={6}
              p={2}
              alignItems="stretch"
              as="section"
              w="100%"
            >
              {products.data.map((product: any) => (
                <ProductCard data={product} key={product.id} />
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
              w="100%"
            >
              {categories.data.map((category: any) => (
                <FeatureCategory data={category} key={category.id} />
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

export async function getServerSideProps({ query }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL + "catalog";
  const [requestProduct, requestCategory] = await Promise.all([
    fetch(`${baseUrl}?limit=6`),
    fetch(`${baseUrl}/categories`),
  ]);
  const [products, categories] = await Promise.all([
    requestProduct.json(),
    requestCategory.json(),
  ]);

  return { props: { products, categories, query } };
}

export default Homepage;
