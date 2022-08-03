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

const FeatureCategory = ({ data }: any) => {
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
          {data.category_image && (
            <Image
              h={
                data.category_image.height > data.category_image.width
                  ? "100%"
                  : "auto"
              }
              w={
                data.category_image.height > data.category_image.width
                  ? "auto"
                  : "100%"
              }
              top={
                data.category_image.width > data.category_image.height
                  ? "50%"
                  : "0"
              }
              transform={
                data.category_image.width > data.category_image.height
                  ? "translateY(-50%)"
                  : "translateY(0)"
              }
              pos="absolute"
              alt={`Thumbnail of ${data.category_image.alt}`}
              src={data.category_image.url}
              fallback={<Skeleton w="full" h="full" />}
            />
          )}
        </Flex>
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
        </VStack>
      </VStack>
    </LinkBox>
  );
};

export default FeatureCategory;
