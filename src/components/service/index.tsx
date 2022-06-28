import { ReactElement } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAssistant } from "@react-icons/all-files/fc/FcAssistant";
import { FcDonate } from "@react-icons/all-files/fc/FcDonate";
import { FcInTransit } from "@react-icons/all-files/fc/FcInTransit";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={"center"}>
      <Flex
        w={12}
        h={12}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function Service() {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={8} h={8} />}
          title={"Lifetime Support"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={8} h={8} />}
          title={"Unlimited Donations"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={8} h={8} />}
          title={"Instant Delivery"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
      </SimpleGrid>
    </Box>
  );
}
