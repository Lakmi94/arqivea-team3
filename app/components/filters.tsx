"use client";

import { Flex, Box, Text, Button } from "@chakra-ui/react";
import filtersData from "../filters.json";
import { useFilters } from "../context/FilterContext";

interface FiltersProps {
  onApply?: () => void;
}

export default function Filters({ onApply }: FiltersProps) {
  const { selectedFilters, toggleFilter, clearFilters } = useFilters();
  const totalSelectedCount = Object.values(selectedFilters).flat().length;
  const showButtons = totalSelectedCount > 0;

  return (
    <Flex
      p="4"
      maxW="4xl"
      bg="brand.surface"
      borderWidth="1px"
      borderColor="brand.border"
      borderRadius="lg"
      justifyContent={"space-between"}>
      <Flex direction="column" gap="4">
        {filtersData.filters.map((filter) => (
          <Box key={filter.id}>
            <Text fontWeight="bold" mb="2">
              {filter.id}
            </Text>
            <Flex wrap="wrap" gap="2">
              {filter.options.map((option) => {
                const isSelected = selectedFilters[filter.id]?.includes(option);
                return (
                  <Button
                    key={option}
                    size="sm"
                    bg={isSelected ? "brand.primary" : "brand.surface"}
                    color={isSelected ? "white" : "brand.text"}
                    borderWidth="1px"
                    h={"25px"}
                    borderColor={isSelected ? "brand.primary" : "brand.border"}
                    _hover={{
                      bg: isSelected
                        ? "brand.primaryHover"
                        : "brand.placeholder",
                    }}
                    onClick={() => toggleFilter(filter.id, option)}>
                    {option}
                  </Button>
                );
              })}
            </Flex>
          </Box>
        ))}
      </Flex>
      {showButtons && (
        <Flex alignItems={"flex-end"} pt="2" ml='-80px'>
          {totalSelectedCount > 0 && (
             <Button
               size="sm"
               mr="10px"
               onClick={clearFilters}
               bg="brand.surface"
               borderWidth="1px"
               borderColor="brand.border"
               color="brand.text"
               _hover={{ bg: "brand.placeholder" }}>
               Clear all filters
             </Button>
          )}
          
            <Button
              size="sm"
              onClick={() => {
                if (onApply) {
                  onApply();
                }
              }}
              bg="brand.surface"
              borderWidth="1px"
              borderColor="brand.border"
              color="brand.text"
              _hover={{ bg: "brand.placeholder" }}>
              Apply ({totalSelectedCount}) filters
            </Button>
          </Flex>
      )}
    </Flex>
  );
}
