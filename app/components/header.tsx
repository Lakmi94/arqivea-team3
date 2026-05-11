"use client";

import {
  Flex,
  HStack,
  Box,
  Link as ChakraLink,
  Container,
  Image,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useFilters } from "../context/FilterContext";
import { usePathname } from "next/navigation";
import { RiFootprintLine } from "react-icons/ri";
import { FaRegMap } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";

export default function Header() {
  const { resetAll } = useFilters();
  const pathname = usePathname();

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
            <ChakraLink
              asChild
              _hover={{ textDecoration: "none" }}
              _focus={{ outline: "none" }}>
              <NextLink href="/" onClick={resetAll}>
                <Image
                  src="/images/arqivea.png"
                  alt="Arqivea Logo"
                  h="10"
                  objectFit="contain"
                />
             
              </NextLink>
            </ChakraLink>
          </Box>

         
          <HStack display={{ base: "none", md: "flex" }}>
            <ChakraLink
              asChild
              bg={pathname === "/" ? "#CDAC81" : "transparent"}
              color={pathname === "/" ? "#3d3326" : "fg.muted"}
             
              w="150px"
              py="2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              transition="all 0.2s"
              _hover={{ color: pathname === "/" ? "#3d3326" : "brand.text", textDecoration: "none", bg: "#EBDDCC" }}
              _focus={{outline:'none'}}>
              <NextLink href="/" onClick={resetAll}>
                <Icon as={MdSearch} boxSize="5" mr="2" />
                Discovery
              </NextLink>
            </ChakraLink>
            <ChakraLink
              asChild
              bg={pathname === "/routeplanner" ? "#CDAC81" : "transparent"}
              color={pathname === "/routeplanner" ? "#3d3326" : "fg.muted"}
            
              w="150px"
              py="2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              transition="all 0.2s"
              _hover={{ color: pathname === "/routeplanner" ? "#3d3326" : "brand.text", textDecoration: "none", bg: "#EBDDCC" }}
              _focus={{outline:'none'}}>
              <NextLink href="/routeplanner">
                <Icon as={FaRegMap} boxSize="5" mr="2" />
                Route Planner
              </NextLink>
            </ChakraLink>
            <ChakraLink
              asChild
              bg={pathname === "/footprints" ? "#CDAC81" : "transparent"}
              color={pathname === "/footprints" ? "#3d3326" : "fg.muted"}
              w="150px"
              py="2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              transition="all 0.2s"
              _hover={{ color: pathname === "/footprints" ? "#3d3326" : "brand.text", textDecoration: "none", bg: "#EBDDCC" }}
              _focus={{outline:'none'}}>
              <NextLink href="/footprints">
                <Icon as={RiFootprintLine} boxSize="5" mr="2" />
                Footprints
              </NextLink>
            </ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}