"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Icon, Dialog, Image, Spinner } from "@chakra-ui/react";
import { IoClose, IoCheckmark } from "react-icons/io5";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareDialog({ isOpen, onClose }: ShareDialogProps) {
  const [showToast, setShowToast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsGenerating(true);
      setShowToast(false); // Clean up the toast for the next time it opens!
    }
  }

  const handleFacebookShare = () => {
    console.log("Share to Facebook");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Dialog.Backdrop bg="blackAlpha.600" />
      <Dialog.Positioner display="flex" alignItems="center" justifyContent="center" p="6">
        <Dialog.Content
          bg="brand.surface"
          borderRadius="lg"
          w="620px"
          maxW="90vw"
          p="6"
          position="relative"
          shadow="xl"
        >
          {/* Close button */}
          <Dialog.CloseTrigger position="absolute" top="4" right="4" cursor="pointer">
            <Icon as={IoClose} boxSize="6" color="brand.muted" _hover={{ color: "brand.text" }} />
          </Dialog.CloseTrigger>

          <Dialog.Header p={0} borderBottomWidth={'1px'}>
            <Dialog.Title fontSize="2xl" fontWeight="bold" mb="5">
              Share your visit!
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body p={0}>
            {isGenerating ? (
              <Flex direction="column" align="center" justify="center" h="400px" gap="4">
                <Spinner size="xl" color="brand.primary" />
                <Text color="brand.muted" fontWeight="medium" fontSize="lg">
                  Generating your postcard...
                </Text>
              </Flex>
            ) : (
              <Flex direction="column" align="center" gap="5" mt={'15px'}>
                {/* Share card preview */}
                <Box
                  w="340px"
                  maxW="100%"
                  bg="brand.bg"
                  borderWidth="1px"
                  borderColor="brand.border"
                  borderRadius="md"
                  p="4"
                  boxShadow="md"
                >
                  {/* Postcard Image */}
                  <Image
                    src="/images/madrid_golden_triangle_collage.png"
                    alt="Madrid's Art Triangle Collage"
                    h="210px"
                    w="full"
                    objectFit="cover"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="brand.border"
                  />

                  <Text mt="4" fontSize="sm" lineHeight="1.6">
                    Even a wandering minstrel must pause to marvel at the visual
                    masterpieces of Madrid&apos;s Golden Triangle! Just completed
                    the Paseo del Arte trail, and my creative spirit is absolutely
                    overflowing.
                  </Text>

                  <Text mt="2" fontSize="sm" color="brand.muted">
                    #Madrid #Spain
                  </Text>
                </Box>

                {/* Social buttons */}
                
                <Flex gap="6" mt="2">
                  <Image
                    src="/images/Logo_de_Facebook.png"
                    alt="Share to Facebook"
                    w="52px"
                     rounded={'13px'}
                    h="52px"
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                    onClick={handleFacebookShare}
                  />
                  <Image
                    src="/images/Instagram_icon.png"
                    alt="Share to Instagram"
                    w="52px"
                     rounded={'13px'}
                    h="52px"
                    cursor="pointer"
                    _hover={{ opacity: 0.85 }}
                    onClick={() => console.log("Share to Instagram")}
                  />
                </Flex>
              </Flex>
            )}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>

    {showToast && (
      <Flex
        position="fixed"
        inset="0"
        bg="blackAlpha.800"
        alignItems="center"
        justifyContent="center"
        zIndex="9999"
      >
        <Flex
          bg="brand.surface"
          color="brand.text"
          borderWidth="1px"
          borderColor="brand.border"
          px="10"
          py="8"
          borderRadius="xl"
          shadow="dark-lg"
          alignItems="center"
          gap="4"
        >
          <Icon as={IoCheckmark} color="green.500" boxSize="10" />
          <Text fontWeight="bold" fontSize="2xl">Shared to Facebook</Text>
        </Flex>
      </Flex>
    )}
    </>
  );
}