import {
  HStack,
  Link,
  Text,
  Image,
  TextProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";

const MotionText = motion<TextProps>(Text);

const Logo = () => {
  return (
    <HStack spacing={4}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          type: "ease",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NextLink href="/" passHref>
          <Image alt="Logo" src="/assets/images/logo.png" />
        </NextLink>
      </motion.div>
    </HStack>
  );
};

export default Logo;
