"use client";

import { useState } from "react";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import ArtworkDialog from "./artworkDialog";

export interface ArtworkCardProps {
  title: string;
  artist: string;
  academicNotes: string;
  imageUrl?: string;
  recommendationTag: string | undefined;
  museum: string;
  city: string;
  room: string;
  medium: string;
  displayStatus: string;
  accessionNumber: string;
  year: string;
  dimensions: string;
  tags: string[];
}

export default function ArtworkCard(props: ArtworkCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, artist, imageUrl, recommendationTag, museum, city, room, medium, displayStatus } = props;

  return (
    <>
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="brand.surface"
      shadow="sm"
      cursor="pointer"
      onClick={() => setIsDialogOpen(true)}
      _hover={{ shadow: "md" }}
      transition="shadow 0.2s">
      <Box position="relative">
        {imageUrl ? (
          <Image
            src={`./images/${imageUrl}`}
            alt={title}
            h={80}
            w="full"
            objectFit="cover"
          />
        ) : (
          <Box h="48" bg="brand.placeholder" />
        )}
        {displayStatus && (
          <Box
            position="absolute"
            top="3"
            left="3"
            bg="whiteAlpha.900"
            backdropFilter="blur(4px)"
            px="2"
            py="1"
            borderRadius="md"
            fontSize="xs"
            fontWeight="bold"
            color="gray.800"
            shadow="sm"
          >
            {displayStatus}
          </Box>
        )}
      </Box>
      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        p="4"
        borderBottomWidth="1px"
        borderBottomColor="brand.border">
        <Box>
          <Heading as="h3" size="md" mb="2">
            {title}
          </Heading>
          <Text color="brand.muted" fontSize="sm">
            {artist}
          </Text>
        </Box>
        {recommendationTag && (
          <Box
            borderWidth="1px"
            borderBlockColor="brand.border"
            borderRadius="md"
            p="2">
            <Text>{recommendationTag}</Text>
          </Box>
        )}
         
      </Flex>
      <Flex direction="column" p="2">
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.lightMuted">
            Museum
          </Text>
          <Text fontSize="sm" color="brand.lightMuted">
            {museum}, {city}
          </Text>
        </Flex>
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.lightMuted">
            Room
          </Text>
          <Text fontSize="sm" color="brand.lightMuted">
            {room}
          </Text>
        </Flex>
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.lightMuted">
          Medium
          </Text>
          <Text fontSize="sm" color="brand.lightMuted">
            {medium}
          </Text>
        </Flex>
      </Flex>
    </Box>

    <ArtworkDialog
      {...props}
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
    />
    </>
  );
}
