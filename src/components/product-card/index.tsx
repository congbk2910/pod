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
} from "@chakra-ui/react";
import {
  DARK_CARD_COLOR,
  LIGHT_CARD_COLOR,
  LIGHT_BLUE_COLOR,
  DARK_BLUE_COLOR,
  LIGHT_BLACK_COLOR,
  DARK_BLACK_COLOR,
} from "src/constants";

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
      >
        <Image
          alt={`Thumbnail of ${data.product_image.alt}`}
          src={data.product_image.url}
          fallback={<Skeleton w="full" h="full" />}
        />
        <VStack p={3} spacing={1} alignItems="flex-start" flex={1} w="full">
          <LinkOverlay href={data.url} isExternal w="full">
            <Heading
              isTruncated
              size="md"
              color={mode(LIGHT_BLACK_COLOR, DARK_BLACK_COLOR)}
            >
              {data.name}
            </Heading>
          </LinkOverlay>
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
