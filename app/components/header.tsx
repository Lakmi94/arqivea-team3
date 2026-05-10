"use client";

import {
  Flex,
  HStack,
  Box,
  Button,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useFilters } from "../context/FilterContext";

export default function Header() {
  const { resetAll } = useFilters();

  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      bg="bg.panel"
      position="sticky"
      top="0"
      w="full"
      zIndex="sticky">
      <Container>
        <Flex h="16" alignItems="center" justify="space-between">
          {/* 1. Logo / Brand */}
          <Box fontWeight="bold" fontSize="xl" letterSpacing="tight">
            <ChakraLink asChild _hover={{ textDecoration: "none" }}>
              <NextLink href="/" onClick={resetAll}>Arqivea</NextLink>
            </ChakraLink>
          </Box>

          {/* 2. Desktop Navigation */}
          {/* Hidden on mobile (base), shown as a flex row on medium (md) screens and up */}
          <HStack gap="8" display={{ base: "none", md: "flex" }}>
            <ChakraLink
              asChild
              color="fg.muted"
              _hover={{ color: "fg", textDecoration: "none" }}>
              <NextLink href="/" onClick={resetAll}>Discovery</NextLink>
            </ChakraLink>
            <ChakraLink
              asChild
              color="fg.muted"
              _hover={{ color: "fg", textDecoration: "none" }}>
              <NextLink href="/routeplanner">Route Planner</NextLink>
            </ChakraLink>
            <ChakraLink
              asChild
              color="fg.muted"
              _hover={{ color: "fg", textDecoration: "none" }}>
              <NextLink href="/footprints">Footprints</NextLink>
            </ChakraLink>
          </HStack>

        </Flex>
      </Container>
    </Box>
  );
}
