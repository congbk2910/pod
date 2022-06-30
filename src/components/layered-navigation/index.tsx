import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
  Checkbox,
  CheckboxGroup,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";

export default function LayeredNavigation({ categories, tags, query }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        categories={categories}
        tags={tags}
        query={query}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            categories={categories}
            tags={tags}
            query={query}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  categories?: any;
  tags?: any;
  query?: any;
}

const SidebarContent = ({
  onClose,
  categories,
  tags,
  query,
  ...rest
}: SidebarProps) => {
  const router = useRouter();

  const currentPath = router.pathname;
  const currentQuery = router.query;

  const updateFilters = (action: string, value: string, checked: boolean) => {
    var tag = "";
    switch (action) {
      case "tag":
        if (checked) {
          tag = [query.tag, value].toString().replace(/^,|,$/g, "");
        } else {
          tag = query.tag
            .split(",")
            .filter(function (e: string) {
              return e !== value;
            })
            .toString()
            .replace(/^,|,$/g, "");
        }

        currentQuery.tag = tag;
        router.push({
          pathname: currentPath,
          query: currentQuery,
        });
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    router.push({
      pathname: currentPath,
      query: {
        slug: query.slug,
      },
    });
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "100%" }}
      h="full"
      {...rest}
    >
      <Flex
        h="12"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <CloseButton onClick={onClose} />
      </Flex>
      {query.tag && (
        <Box py="8">
          <Box>
            <strong>Now Shopping by:</strong>
            <List spacing={3}>
              {tags &&
                tags.data.map(
                  (item: any) =>
                    query.tag.split(",").includes(item.slug) && (
                      <ListItem key={item.slug}>
                        <Flex alignItems={"center"}>
                          <Link
                            _hover={{
                              bg: "blue.500",
                              color: "white",
                            }}
                            onClick={() =>
                              updateFilters("tag", item.slug, false)
                            }
                          >
                            <FiX />
                          </Link>
                          <Text pl={5}>{item.name}</Text>
                        </Flex>
                      </ListItem>
                    )
                )}
            </List>
          </Box>
          <Box>
            <Link
              _hover={{
                color: "blue.500",
              }}
              onClick={() => clearFilters()}
            >
              Clear All
            </Link>
          </Box>
        </Box>
      )}
      <strong>Shopping Options</strong>
      <Accordion defaultIndex={[0, 1]} allowMultiple={true}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={500}>
                Category
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {categories &&
            categories.data.map((item: any) => (
              <AccordionPanel pb={4} key={item.id}>
                <NextLink href={item.url} passHref>
                  {item.name}
                </NextLink>
              </AccordionPanel>
            ))}
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={500}>
                Tag
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <CheckboxGroup
            colorScheme="blue"
            value={query.tag ? query.tag.split(",") : []}
          >
            {tags &&
              tags.data.map((item: any) => (
                <AccordionPanel pb={4} key={item.slug}>
                  <Checkbox
                    onChange={(e) =>
                      updateFilters(
                        "tag",
                        e.currentTarget.value,
                        e.target.checked
                      )
                    }
                    value={item.slug}
                  >
                    {item.name}
                  </Checkbox>
                </AccordionPanel>
              ))}
          </CheckboxGroup>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
