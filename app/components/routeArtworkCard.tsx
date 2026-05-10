"use client";

import { Box, Text, Image } from "@chakra-ui/react";
import { ArtworkCardProps } from "./artworkCard";

export default function RouteArtworkCard(props: ArtworkCardProps) {
  const { title, imageUrl, museum, city } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg="brand.surface"
      overflow="hidden"
      shadow="sm"
    >
      {imageUrl ? (
        <Image
          src={`./images/${imageUrl}`}
          alt={title}
          h={48}
          w="full"
          objectFit="cover"
        />
      ) : (
        <Box h={48} bg="brand.placeholder" />
      )}
      <Box p="4">
        <Text fontWeight="bold">{title}</Text>
        <Text color="brand.muted" fontSize="sm">{museum} - {city}</Text>
         
      </Box>
    </Box>
  );
}