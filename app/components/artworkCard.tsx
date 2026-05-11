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
  imagePosition?: string;
}

export default function ArtworkCard(props: ArtworkCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, artist, imageUrl, recommendationTag, museum, city, room, medium, displayStatus, imagePosition } = props;

  return (
    <>
    <Box
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="brand.surface"
      shadow="sm"
      cursor="pointer"
      onClick={() => setIsDialogOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsDialogOpen(true);
        }
      }}
      _hover={{ shadow: "md" }}
      transition="shadow 0.2s">
      <Box position="relative">
        {imageUrl ? (
          <Image
            src={`./images/${imageUrl}`}
            alt={title}
            h={64}
            w="full"
            objectFit="cover"
            objectPosition={imagePosition || "top"}
          />
        ) : (
          <Box h={56} bg="brand.placeholder" />
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
            fontSize="sm"
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
            // borderWidth="1px"
            // borderBlockColor="brand.text.primary"
            borderRadius="md"
            bg="brand.tertiary"
            px="2"
            py="1">
            <Text>{recommendationTag}</Text>
          </Box>
        )}
         
      </Flex>
      <Flex direction="column" p="2">
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.text.primary" fontWeight="bold">
            Museum
          </Text>
          <Text fontSize="sm" color="brand.lightMuted">
            {museum}
          </Text>
        </Flex>
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.text.primary" fontWeight="bold">
            Room
          </Text>
          <Text fontSize="sm" color="brand.lightMuted">
            {room}
          </Text>
        </Flex>
        <Flex p="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="brand.text.primary" fontWeight="bold">
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
