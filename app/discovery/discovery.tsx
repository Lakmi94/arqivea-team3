"use client";

import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

// Retrieve the globally applied filters here
import { useFilters } from "../context/FilterContext";

export default function Discovery() {
  const { selectedFilters } = useFilters();
  console.log('selectedFilters',selectedFilters);

  const flatFilters = Object.values(selectedFilters).flat();
  const concatenatedFilters = flatFilters.join(", ");

  const isSpainAndModern = flatFilters.length === 2 && flatFilters.includes("Spain") && flatFilters.includes("Modern");

  return (
    <Flex
      direction="column"
      flex="1"
      align="center"
      w="full"
      bg="gray.50"
      fontFamily="sans"
      color="gray.800"
    >
      {isSpainAndModern ? (
        <Text mt="2" fontSize="md" color="gray.500">Applied Filters: {concatenatedFilters}</Text>
      ) : (
        <Text mt="2" fontSize="md" color="gray.500">No results found.</Text>
      )}
    </Flex>
  );
}
