import React from "react";

import { useFetchCategories } from "@api/catalog";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  usePopoverContext,
} from "@chakra-ui/react";
import { NavItemProps } from "@appTypes/all-types";
import NextLink from "next/link";
import { toast } from "react-toastify";
import Logo from "../logo";
import ThemeButton from "../theme-button";

interface PopoverTriggerProps {
  /**
   * The React child to use as the
   * trigger for the popover
   */
  children: React.ReactChild;
}

export const PopoverTrigger: React.FC<
  React.PropsWithChildren<PopoverTriggerProps>
> = (props) => {
  // enforce a single child
  const child: any = React.Children.only(props.children);
  const { getTriggerProps } = usePopoverContext();
  return React.cloneElement(child, getTriggerProps(child.props, child.ref));
};

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useFetchCategories([]);

  if (isError) {
    let errorMessage = "Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  }

  return (
    <Box
      zIndex={100}
      as="header"
      display="inline-block"
      position="fixed"
      w="100%"
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex justify={{ base: "left" }}>
          <Logo />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav data={categories} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ThemeButton />
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            variant={"link"}
            href={"/signin"}
            display={{ base: "none", md: "flex" }}
          >
            Sign In
          </Button>
          <NextLink href="/signup" passHref>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              _hover={{
                bg: "blue.300",
              }}
              display={{ base: "none", md: "flex" }}
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
      </Flex>

      {categories && (
        <Collapse in={isOpen} animateOpacity>
          <MobileNav data={categories} />
        </Collapse>
      )}
    </Box>
  );
}

const DesktopNav = ({ data }: any) => {
  const NAV_ITEMS: Array<NavItemProps> = [
    {
      name: "Catalog",
      url: "",
      childs: data?.data,
      root: "1",
    },
    {
      name: "How it works",
      url: "",
      childs: "",
      root: "1",
    },
    {
      name: "Pricing",
      url: "",
      childs: "",
      root: "1",
    },
    {
      name: "Blog",
      url: "",
      childs: "",
      root: "1",
    },
    {
      name: "Services",
      url: "",
      childs: [
        {
          name: "Transfer Products",
          url: "",
          childs: "",
        },
        {
          name: "Exports Program",
          url: "",
          childs: "",
        },
      ],
      root: "1",
    },
  ];

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem: NavItemProps, index: number) => (
        <DesktopSubNav key={index} {...navItem} />
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ name, url, childs, root }: NavItemProps) => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const popoverLinkBgColor = useColorModeValue("blue.50", "gray.900");

  return (
    <Popover
      trigger={"hover"}
      placement={root ? "bottom-start" : "right-start"}
    >
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Link
              role={"group"}
              display={"block"}
              p={2}
              rounded={"md"}
              _hover={{ bg: popoverLinkBgColor }}
            >
              <NextLink href={url}>
                <Stack direction={"row"} align={"center"}>
                  <Box>
                    <Text
                      transition={"all .3s ease"}
                      _groupHover={{ color: "blue.400" }}
                      fontWeight={500}
                    >
                      {name}
                    </Text>
                  </Box>
                  {childs && (
                    <Flex
                      transition={"all .3s ease"}
                      transform={"translateX(-10px)"}
                      _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                      }}
                      justify={"flex-end"}
                      align={"center"}
                      flex={1}
                    >
                      {!root && (
                        <Icon
                          color={"blue.400"}
                          w={5}
                          h={5}
                          as={ChevronRightIcon}
                        />
                      )}
                      {root && (
                        <Icon
                          color={"blue.400"}
                          w={5}
                          h={5}
                          ml="1"
                          as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                        />
                      )}
                    </Flex>
                  )}
                </Stack>
              </NextLink>
            </Link>
          </PopoverTrigger>
          {childs && (
            <PopoverContent
              border={0}
              boxShadow={"xl"}
              bg={popoverContentBgColor}
              p={4}
              rounded={"xl"}
              minW={"sm"}
            >
              <Stack>
                {childs.map((child: NavItemProps, index: number) => (
                  <DesktopSubNav key={"child-" + index} {...child} />
                ))}
              </Stack>
            </PopoverContent>
          )}
        </>
      )}
    </Popover>
  );
};

const MobileNav = ({ data }: any) => {
  const NAV_ITEMS: Array<NavItemProps> = [
    {
      name: "Catalog",
      url: "",
      childs: data?.data,
    },
    {
      name: "How it works",
      url: "",
      childs: "",
    },
    {
      name: "Pricing",
      url: "",
      childs: "",
    },
    {
      name: "Blog",
      url: "",
      childs: "",
    },
    {
      name: "Services",
      url: "",
      childs: [
        {
          name: "Transfer Products",
          url: "",
          childs: "",
        },
        {
          name: "Exports Program",
          url: "",
          childs: "",
        },
      ],
    },
    {
      name: "Sign In",
      url: "/signin",
      childs: "",
    },
    {
      name: "Sign Up",
      url: "/signup",
      childs: "",
    },
  ];

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <MobileNavItem key={`mb-` + index} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ name, url, childs }: NavItemProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <NextLink href={url}>
          <Flex
            as={Link}
            href={url}
            justify={"space-between"}
            align={"center"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {name}
            </Text>
          </Flex>
        </NextLink>
        {childs && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            onClick={onToggle}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          {childs &&
            childs.map((child: any, index: number) => (
              <MobileNavItem key={`mb-child-` + index} {...child} />
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
