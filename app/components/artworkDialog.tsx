"use client";

import { useState } from "react";
import {
  Box,
  Text,
  Image,
  Flex,
  Dialog,
  Button,
  Icon,
  ScrollArea,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { ArtworkCardProps } from "./artworkCard";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineMuseum } from "react-icons/md";
import { FiHash } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoColorPaletteSharp } from "react-icons/io5";
import { TbRuler2 } from "react-icons/tb";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useRoutePlanner } from "../context/RoutePlannerContext";
import { FaCity } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

interface ArtworkDialogProps extends ArtworkCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkDialog(props: ArtworkDialogProps) {
  const {
    isOpen,
    onClose,
    title,
    academicNotes,
    imageUrl,
    museum,
    city,
    room,
    medium,
    artist,
    accessionNumber,
    year,
    dimensions,
    tags,
  } = props;

  const { toggleSavedArtwork, isArtworkSaved } = useRoutePlanner();
  const isAddedToRoute = isArtworkSaved(title);

  const [showToast, setShowToast] = useState(false);

  const handleToggleRoutePlanner = () => {
    const { isOpen, onClose, ...artworkProps } = props;
    toggleSavedArtwork(artworkProps);
    if (!isAddedToRoute) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setShowToast(false);
    }
  };

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          if (!e.open) onClose();
        }}>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Dialog.Content
            bg="brand.surface"
            color="brand.text"
            borderRadius="lg"
            maxW="max-content"
            shadow="2xl"
            position="relative">
            <Dialog.Header display={"flex"} flexDir={"row"}>
              <Flex flexDir={"column"}>
                <Text>Artwork details</Text>
                <Dialog.Title fontSize="2xl" fontWeight="bold">
                  {title}
                </Dialog.Title>
              </Flex>
            </Dialog.Header>

            <Dialog.Body display={"flex"} flexDir={"row"} gap="8">
              <Flex flexDir={"column"} gap="2">
                {imageUrl ? (
                  <Image
                    src={`./images/${imageUrl}`}
                    alt={title}
                    maxH="480px"
                    objectFit="contain"
                    maxW="540px"
                    mb="4"
                    ml="-24px"
                  />
                ) : (
                  <Box bg="brand.placeholder" borderRadius="md" mb="4" />
                )}
                <Flex direction="column" gap={2}>
                  <Text fontWeight="bold">Tags</Text>
                  <Flex wrap="wrap" gap={2}>
                    {tags?.map((tag) => (
                      <Box
                        key={tag}
                        fontSize="sm"
                        borderWidth="1px"
                        borderColor="brand.border"
                        borderRadius="md"
                        px="2"
                        py="1">
                        {tag}
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDir={"column"} w="540px" mt={"-30px"} pb="4">
                <Flex
                  borderBottomWidth="1px"
                  justify="space-between"
                  align="center"
                  pb="4">
                  <Text fontSize="lg" color="brand.muted">
                    {artist}
                  </Text>
                  <Button
                    bg={isAddedToRoute ? "brand.primary" : "brand.tertiary"}
                    backdropFilter="blur(4px)"
                    px="4"
                    py="2"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={"brand.primary"}
                    width="170px"
                    fontSize="sm"
                    fontWeight="bold"
                    color={isAddedToRoute ? "brand.primaryText" : "brand.text"}
                    shadow="sm"
                    onClick={handleToggleRoutePlanner}
                    //  bg="brand.primary"
                    // color="brand.primaryText"
                    _hover={{ bg: "brand.primaryHover", borderColor: "brand.primaryHover" }}>
                    <Icon
                      as={isAddedToRoute ? FaCheck : FaRegBookmark}
                      boxSize="4"
                      mr="2"
                    />
                    {isAddedToRoute ? "Saved to Wishlist" : "Save to Wishlist"}
                  </Button>
                </Flex>

                <Flex
                  direction="column"
                  gap="2"
                  pt="4"
                  w="400px"
                  borderColor="brand.border">
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={FiHash}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Accession number</Text>
                    </Flex>

                    <Text>{accessionNumber}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={MdOutlineMuseum}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Museum</Text>
                    </Flex>
                    <Text>{museum}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={FaCity}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">City</Text>
                    </Flex>
                    <Text>{city}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={GrLocation}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Gallery room</Text>
                    </Flex>
                    <Text>{room}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={IoCalendarNumberOutline}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Year</Text>
                    </Flex>
                    <Text>{year}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={IoColorPaletteSharp}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Medium</Text>
                    </Flex>
                    <Text>{medium}</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Flex>
                      <Icon
                        as={TbRuler2}
                        boxSize="5"
                        color="brand.primaryText"
                        mr="2"
                      />
                      <Text fontWeight="bold">Dimensions</Text>
                    </Flex>
                    <Text>{dimensions}</Text>
                  </Flex>
                </Flex>
                <Flex
                  w="540px"
                  borderTopWidth={"1px"}
                  mt={"10px"}
                  direction="column"
                  pt="4">
                  <Text
                    fontSize="lg"
                    color="brand.primaryText"
                    mb="2"
                    fontWeight="bold">
                    Academic notes
                  </Text>
                  <ScrollArea.Root maxH="330px" pr="2">
                    <ScrollArea.Viewport>
                      <ScrollArea.Content spaceY="4">
                        <Text color="brand.text">{academicNotes}</Text>
                      </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar>
                      <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                  </ScrollArea.Root>
                </Flex>
              </Flex>
            </Dialog.Body>

            <Dialog.CloseTrigger
              position="absolute"
              top="4"
              right="4"
              cursor="pointer">
              <Icon as={IoClose} boxSize="6" color="brand.muted" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>

      {showToast && (
        <Box
          role="status"
          aria-live="polite"
          position="fixed"
          bottom="8"
          right="8"
          bg="brand.surface"
          color="brand.text"
          borderWidth="1px"
          borderColor="brand.border"
          px="4"
          py="3"
          borderRadius="md"
          shadow="xl"
          display="flex"
          alignItems="center"
          gap="3"
          zIndex="9999">
          <Icon as={IoCheckmark} color="green.500" boxSize="5" />
          <Text fontWeight="medium">Added to route planner</Text>
          <Icon
            as={IoClose}
            boxSize="5"
            color="brand.muted"
            cursor="pointer"
            onClick={() => setShowToast(false)}
            _hover={{ color: "brand.text" }}
          />
        </Box>
      )}
    </>
  );
}
