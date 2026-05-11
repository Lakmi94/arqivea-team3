"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import { useRoutes } from "../context/RoutesContext";
import { IoLocationSharp } from "react-icons/io5";
import ShareDialog from "../components/shareDialog";
import { ImShare2 } from "react-icons/im";
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTrashOutline,
} from "react-icons/io5";

export default function Footprints() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { routes, toggleRouteCompletion } = useRoutes();

  // Map the cities to their approximate position on the world map image
  const cityCoordinates: Record<string, { top: string; left: string }> = {
    Madrid: { top: "52%", left: "47%" }, // (Mapped from Spain)
    Spain: { top: "52%", left: "47%" },
    London: { top: "42%", left: "47%" },
    "New York": { top: "48%", left: "27%" },
    Paris: { top: "45%", left: "48%" },
  };

  // Extract a unique list of cities from the artworks of all completed routes
  const completedCities = Array.from(
    new Set(
      routes
        .filter((r) => r.isCompleted)
        .flatMap((r) => r.artworks?.map((a) => a.city) || []),
    ),
  );

  return (
    <Flex
      p="6"
      direction="column"
      flex="1"
      align="center"
      bg="brand.bg"
      fontFamily="sans"
      color="brand.text"
      position="relative">
      <Flex maxW="1299px" direction="column" w="full" gap="5" px="6">
        {/* Page header */}
        <Box>
          <Heading as="h1" fontSize="3xl" fontWeight="bold">
            Footprints
          </Heading>
          <Text mt="2" fontSize="lg" color="brand.muted">
            Personal Digital Drawer and Cultural Footprint
          </Text>
          <Text mt="3" color="brand.text">
            Your routes: {routes.length}
          </Text>
        </Box>

        {/* Main content area */}
        <Flex gap="6" w="full" align="stretch">
          {/* Left: route archive list */}
          <Box w="370px" flexShrink={0} minH="460px" bg="transparent">
            <Flex direction="column" gap="5">
              {routes.length > 0 ? (
                routes.map((route) => {
                  const displayMuseums =
                    route.museums.length > 2
                      ? "Multiple museums"
                      : route.museums.length > 0
                        ? route.museums.join(" • ")
                        : "None";

                  return (
                    <Box
                      key={route.id}
                      borderWidth="1px"
                      borderColor="brand.border"
                      borderRadius="md"
                      p="4"
                      bg="brand.surface"
                      // opacity={route.isCompleted ? 0.65 : 1}
                    >
                      <Flex justify="space-between" align="flex-start" gap="3">
                        <Box>
                          <Text fontWeight="bold">{route.name}</Text>
                          <Text fontSize="sm" color="brand.muted" mt="1">
                            {displayMuseums}
                          </Text>
                        </Box>

                        {route.isCompleted ? (
                          <Button
                            size="sm"
                            bg="brand.tertiary"
                            color="#3d3326"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor={"brand.primary"}
                            transition="all 0.2s ease"
                            _hover={{
                              bg: "brand.primaryHover",
                              color: "#3d3326",
                            }}
                            onClick={() => setIsShareOpen(true)}>
                            <Icon as={ImShare2} boxSize="4" mr="2" />
                            Share
                          </Button>
                        ) : (
                          <Text fontSize="sm" color="brand.muted">
                            {route.stopsCount} stop
                            {route.stopsCount !== 1 ? "s" : ""}
                          </Text>
                        )}
                      </Flex>

                      <Flex
                        justify="space-between"
                        align="center"
                        mt="5"
                        color="brand.muted"
                        fontSize="sm">
                        <Flex
                          align="center"
                          gap="2"
                          tabIndex={0}
                          transition="all 0.2s ease"
                          _hover={{
                            color: "#806b50",
                            transform: "translateY(-2px)",
                          }}
                          color={"#b5956a"}
                          cursor="pointer"
                          onClick={() => toggleRouteCompletion(route.id)}>
                          {!route.isCompleted ? (
                            <>
                              <Icon
                                as={
                                   IoEllipseOutline
                                }
                                boxSize="5"
                              />

                              <Text>Mark as completed</Text>
                            </>
                          ) : (
                            <>
                             <Icon
                                as={
                                  IoCheckmarkCircle
                                }
                                boxSize="5"
                                color="brand.primary"
                              />
                              <Text>Completed</Text>
                            </>
                          )}
                        </Flex>

                        <Text>{route.date}</Text>
                        {route.isCompleted && (
                          <Text>
                            {route.stopsCount} stop
                            {route.stopsCount !== 1 ? "s" : ""}
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  );
                })
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  p={6}
                  bg="brand.surface"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="brand.border">
                  <Text fontWeight="bold">No routes yet</Text>
                  <Text
                    color="brand.muted"
                    fontSize="sm"
                    textAlign="center"
                    mt={2}>
                    Head over to the Route Planner to create your first museum
                    route!
                  </Text>
                </Flex>
              )}
            </Flex>
          </Box>

          {/* Right: map / footprint visualization area */}
          <Box flex="1" minH="460px" bg="brand.surface" borderRadius="lg">
            <Flex
              h="full"
              minH="420px"
              align="center"
              justify="center"
              textAlign="center"
              borderWidth="1px"
              borderColor="brand.border"
              borderRadius="md"
              bg="brand.bg"
              overflow="hidden"
              position="relative">
              <Image
                src="/images/worldMap.png"
                alt="Cultural footprint map"
                w="full"
                h="full"
                objectFit="cover"
              />
              {completedCities.map((city) => {
                const pos = cityCoordinates[city];
                if (!pos) return null;

                return (
                  <Box
                    key={city}
                    position="absolute"
                    top={pos.top}
                    left={pos.left}
                    transform="translate(-50%, -100%)"
                    zIndex={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      bg="whiteAlpha.900"
                      px={1.5}
                      py={0.5}
                      borderRadius="md"
                      shadow="sm"
                      color="brand.text">
                      {city}
                    </Text>
                    <Box position="relative">
                      <Icon as={IoLocationSharp} boxSize="8" color="red.500" />
                      <Box
                        position="absolute"
                        top="6px"
                        left="50%"
                        transform="translateX(-50%)"
                        w="2.5"
                        h="2.5"
                        bg="white"
                        borderRadius="full"
                      />
                    </Box>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </Flex>

      {/* Share modal */}
      <ShareDialog isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </Flex>
  );
}
