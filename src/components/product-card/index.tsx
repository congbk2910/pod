import {
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  useColorModeValue as mode,
  VStack,
  Flex,
  Box,
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

const ProductCard = ({ data }: any) => {
  return (
    <LinkBox as="article">
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
        _hover={{ transform: "scale(1.05, 1.05)" }}
        w="100%"
      >
        <Flex pos="relative" w="100%" h="0" pb="100%" justifyContent="center">
          {data.product_image && (
            <Image
              h={
                data.product_image.height > data.product_image.width
                  ? "100%"
                  : "auto"
              }
              w={
                data.product_image.height > data.product_image.width
                  ? "auto"
                  : "100%"
              }
              top={
                data.product_image.width > data.product_image.height
                  ? "50%"
                  : "0"
              }
              transform={
                data.product_image.width > data.product_image.height
                  ? "translateY(-50%)"
                  : "translateY(0)"
              }
              pos="absolute"
              alt={`Thumbnail of ${data.product_image.alt}`}
              src={data.product_image.url}
              fallback={<Skeleton w="full" h="full" />}
            />
          )}
        </Flex>
        <VStack p={3} spacing={1} alignItems="flex-start" flex={1} w="full">
          <NextLink href={data.url} passHref>
            <LinkOverlay w="full">
              <Heading
                isTruncated
                size="md"
                color={mode(LIGHT_BLACK_COLOR, DARK_BLACK_COLOR)}
              >
                {data.name}
              </Heading>
            </LinkOverlay>
          </NextLink>
          <Text fontSize="sm" noOfLines={4} w="100%">
            {data.note}
          </Text>
          <Flex>
            {data.tag && (
              <Text
                fontSize="xs"
                textTransform="capitalize"
                me={1}
                color={mode(LIGHT_BLUE_COLOR, DARK_BLUE_COLOR)}
              >
                Tags:
              </Text>
            )}
            <Text
              fontSize="xs"
              textTransform="capitalize"
              color={mode(LIGHT_BLUE_COLOR, DARK_BLUE_COLOR)}
            >
              {data.tag &&
                data.tag.map((item: any, index: number) => {
                  if (index === 0) return item.name;
                  return ", " + item.name;
                })}
            </Text>
          </Flex>
        </VStack>
      </VStack>
    </LinkBox>
  );
};

export default ProductCard;
