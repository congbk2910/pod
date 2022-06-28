import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Stack, Text, Button, Box } from "@chakra-ui/react";
import { FcLock } from "@react-icons/all-files/fc/FcLock";

export default function CookiePreference() {
  const [isSSR, setIsSSR] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["cookiePreference"]);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCookie("cookiePreference", true, { path: "/" });
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      !isSSR && !cookies.cookiePreference && (
      <Stack
        p="4"
        borderRadius="sm"
        pos="fixed"
        bottom={0}
        zIndex="1"
        bg="gray.100"
        width="100%"
      >
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Your Privacy</Text>
          <FcLock />
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Text fontSize={{ base: "sm" }} textAlign={"left"}>
            We use cookies and similar technologies to help personalise content,
            tailor and measure ads, and provide a better experience. By clicking
            OK or turning an option on in Cookie Preferences, you agree to this,
            as outlined in our Cookie Policy. To change preferences or withdraw
            consent, please update your Cookie Preferences.
          </Text>
          <Stack direction={{ base: "column", md: "row" }}>
            <Button colorScheme="green" onClick={buttonHandler}>
              OK
            </Button>
          </Stack>
        </Stack>
      </Stack>
      )
    </>
  );
}
