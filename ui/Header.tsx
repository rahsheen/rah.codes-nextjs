"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  useColorMode,
  IconButton,
  Flex,
} from "@chakra-ui/react";

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      justifyContent="flex-end"
      zIndex={1}
      top={0}
      left={0}
      right={0}
      height={45}
      width="100%"
      position="sticky"
      paddingRight={45}
    >
      <IconButton
        onClick={toggleColorMode}
        aria-label="Toggle Color Mode"
        variant="ghost"
        icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        color={useColorModeValue("gray.500", "gray.50")}
      />
    </Flex>
  );
};
