import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Checkbox,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import {
  DARK_CARD_COLOR,
  LIGHT_CARD_COLOR,
  LIGHT_BLUE_COLOR,
  DARK_BLUE_COLOR,
  LIGHT_BLACK_COLOR,
  DARK_BLACK_COLOR,
} from "src/constants";
import NextLink from "next/link";

export default function ProductDetails({ data }: any) {
  console.log(data);
  const yellowColor = useColorModeValue("yellow.500", "yellow.300");
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={data.product_image?.url}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {data.name}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            {data.type_id === "variant" && (
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={yellowColor}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Variants
                </Text>

                {data.childs && (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3 }}
                    gap={6}
                    p={2}
                    alignItems="stretch"
                    as="section"
                    w="100%"
                  >
                    {data.childs.map((product: any) => (
                      <>
                        <LinkBox as="article" key={product.id}>
                          <VStack
                            spacing={0}
                            alignItems="center"
                            rounded="md"
                            bg={mode(LIGHT_CARD_COLOR, DARK_CARD_COLOR)}
                            overflow="hidden"
                            shadow="lg"
                            transitionProperty="transform"
                            transitionDuration="slow"
                            transitionTimingFunction="ease-out"
                            w="100%"
                          >
                            <Flex
                              pos="relative"
                              w="100%"
                              h="0"
                              pb="100%"
                              justifyContent="center"
                            >
                              {product.product_image && (
                                <Image
                                  h={
                                    product.product_image.height >
                                    product.product_image.width
                                      ? "100%"
                                      : "auto"
                                  }
                                  w={
                                    product.product_image.height >
                                    product.product_image.width
                                      ? "auto"
                                      : "100%"
                                  }
                                  top={
                                    product.product_image.width >
                                    product.product_image.height
                                      ? "50%"
                                      : "0"
                                  }
                                  transform={
                                    product.product_image.width >
                                    product.product_image.height
                                      ? "translateY(-50%)"
                                      : "translateY(0)"
                                  }
                                  pos="absolute"
                                  alt={`Thumbnail of ${product.product_image.alt}`}
                                  src={product.product_image.url}
                                  fallback={<Skeleton w="full" h="full" />}
                                />
                              )}
                            </Flex>
                            <VStack>
                              <Checkbox value="naruto" p={4}>
                                <Text
                                  size="md"
                                  color={mode(
                                    LIGHT_BLACK_COLOR,
                                    DARK_BLACK_COLOR
                                  )}
                                >
                                  {product.name}
                                </Text>
                              </Checkbox>
                            </VStack>
                          </VStack>
                        </LinkBox>
                      </>
                    ))}
                  </SimpleGrid>
                )}
              </Box>
            )}
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Save products
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export async function getServerSideProps({ query }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL + "catalog";
  const res = await fetch(`${baseUrl}/${query.id}`);
  const { data } = await res.json();

  return { props: { data } };
}
