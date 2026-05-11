"use client";

import { Box, Flex, Text, Image, Button, Icon } from "@chakra-ui/react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import { ArtworkCardProps } from "./artworkCard";
import { useRoutePlanner } from "../context/RoutePlannerContext";

export default function SelectArtworkCard(props: ArtworkCardProps) {
  const { title, museum, imageUrl, tags, city } = props;
  
  const { toggleSelectedForNewRoute, isSelectedForNewRoute } = useRoutePlanner();
  const isSelected = isSelectedForNewRoute(title);

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      bg="brand.surface"
      p="3"
      align="center"
      shadow="sm"
      gap="4"
    >
      {imageUrl ? (
        <Image
          src={`./images/${imageUrl}`}
          alt={title}
          h="20"
          w="20"
          borderRadius="md"
          objectFit="cover"
        />
      ) : (
        <Box h="20" w="20" bg="brand.placeholder" borderRadius="md" />
      )}
      <Flex flex="1" direction="column" gap="1">
        <Text fontWeight="bold" fontSize="md" lineHeight="tight">{title}</Text>
        <Text color="brand.muted" fontSize="sm">{museum} - {city}</Text>
        <Flex gap="2" wrap="wrap" mt="1">
          {tags?.slice(0, 3).map((tag) => (
            <Text
              key={tag}
              fontSize="sm"
              color="brand.muted"
            >
              #{tag}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Button
        aria-label={isSelected ? `Remove ${title} from route` : `Add ${title} to route`}
        bg={isSelected ? "brand.primary" : "transparent"}
        borderWidth="1px"
        borderColor={isSelected ? "brand.primary" : "brand.border"}
        borderRadius="full"
        w="8"
        h="8"
        minW="0"
        p="0"
        onClick={() => toggleSelectedForNewRoute(props)}
        _hover={{ bg: isSelected ? "brand.primaryHover" : "brand.tertiary" }}>
        <Icon as={isSelected ? HiOutlineMinus : HiOutlinePlus} boxSize="5" color={isSelected ? "brand.primaryText" : "brand.text"} />
      </Button>
    </Flex>
  );
}