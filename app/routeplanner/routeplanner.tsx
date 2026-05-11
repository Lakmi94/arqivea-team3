"use client";
import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  Box,
  Icon,
  Grid,
  Image,
} from "@chakra-ui/react";
import { useRoutes } from "../context/RoutesContext";
import { useRoutePlanner } from "../context/RoutePlannerContext";
import RouteArtworkCard from "../components/routeArtworkCard";
import CreateRouteDialog from "../components/createRouteDialog";
import RouteCard from "../components/routeCard";
import { HiOutlinePlus } from "react-icons/hi";
import {
  IoWalkOutline,
  IoChevronDown,
  IoTimeOutline,
  IoLocationSharp,
} from "react-icons/io5";

export default function RoutePlanner() {
  const { routes } = useRoutes();
  const { savedArtworks } = useRoutePlanner();
  const [isCreateRouteOpen, setIsCreateRouteOpen] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [expandedMuseumIndex, setExpandedMuseumIndex] = useState<number | null>(
    null,
  );

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || null;

  return (
    <Flex
      p="6"
      direction="column"
      flex="1"
      align="center"
      bg="brand.bg"
      fontFamily="sans"
      color="brand.text">
      <Flex maxW="1299px" direction="column" w="full" gap="5" px="6">
        {/* Page header */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          w="full"
          gap="4">
          <Box>
            <Heading as="h1" fontSize="3xl" fontWeight="bold">
              Route Planner
            </Heading>
            <Text mt="2" fontSize="lg" color="brand.text.primary">
              Wishlist Syncing and Museum Routing
            </Text>
            <Text mt="3" color="brand.text">
              Your routes: {routes.length}
            </Text>
          </Box>

          <Button
            onClick={() => setIsCreateRouteOpen(true)}
            bg="brand.placeholder"
            borderWidth="1px"
            borderColor="brand.border"
            color="brand.primaryText"
            _hover={{ bg: "brand.primary" }}>
            <Icon as={HiOutlinePlus} mr="2" />
            Create Route
          </Button>
        </Flex>

        <Flex gap="6" w="full" maxW="1299px" mt="2">
          <Flex
            maxH="450px"
            direction="column"
            w="430px"
            gap={4}
            overflowY="auto"
            pr={2}
            _scrollbar={{ width: "6px" }}
            _scrollbarTrack={{ bg: "transparent" }}
            _scrollbarThumb={{ bg: "brand.border", borderRadius: "full" }}>
            {routes.length === 0 ? (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                h="350px"
                w="full"
                bg="brand.surface"
                p="3"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="brand.border">
                <Text fontSize="xl" fontWeight="bold" mb="4">
                  No routes yet
                </Text>
                <Text>Create a route to plan your visit</Text>
              </Flex>
            ) : (
              routes.map((route) => (
                <RouteCard
                  key={route.id}
                  {...route}
                  isSelected={selectedRoute?.id === route.id}
                  onClick={() => {
                    setSelectedRouteId(route.id);
                    setExpandedMuseumIndex(null);
                  }}
                />
              ))
            )}
          </Flex>

          <Flex maxH="450px" direction="column" flex="1">
            {!selectedRoute ? (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                h="420px"
                w="full"
                bg="brand.surface"
                p="4"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="brand.border">
                <Text fontSize="xl" fontWeight="bold" mb="4">
                  Select a route to view its plan
                </Text>
                <Text>Or create a new route to get started</Text>
              </Flex>
            ) : (
              <Flex direction="column" h="420px" w="full">
                {/* Detailed Plan Container */}
                <Flex direction="column" h="full" w="full" borderRadius="lg">
                  {/* Top Header */}
                  <Flex
                    w="full"
                    bg="brand.surface"
                    p="4"
                    px="5"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="brand.border"
                    justify="space-between"
                    align="center"
                    mb="4"
                    shrink={0}>
                    <Heading size="md" fontSize="xl">
                      {selectedRoute.name}
                    </Heading>
                    <Flex
                      gap="4"
                      color="brand.muted"
                      fontSize="sm"
                      fontWeight="medium">
                      <Text>
                        {selectedRoute.stopsCount} stop
                        {selectedRoute.stopsCount !== 1 ? "s" : ""}
                      </Text>
                      <Text>
                        {selectedRoute.artworks?.length || 0} artwork
                        {(selectedRoute.artworks?.length || 0) !== 1 ? "s" : ""}
                      </Text>
                      <Flex align="center" gap="1">
                        <Icon as={IoTimeOutline} boxSize="4" />
                        <Text>~2 hrs</Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  {/* Main Body Grid */}
                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr 2fr" }}
                    gap="4"
                    flex="1"
                    minH="0">
                    {/* Left Column (Timeline) */}
                    <Flex
                      direction="column"
                      overflowY="auto"
                      pr="2"
                      _scrollbar={{ width: "6px" }}
                      _scrollbarTrack={{ bg: "transparent" }}
                      _scrollbarThumb={{
                        bg: "brand.border",
                        borderRadius: "full",
                      }}>
                      <Text color="brand.muted" fontSize="sm" mb="3">
                        Click a museum to view floor plan
                      </Text>
                      {selectedRoute.museums.length > 0 ? (
                        selectedRoute.museums.map((museum, idx) => {
                          const isExpanded = expandedMuseumIndex === idx;
                          const museumArtworks =
                            selectedRoute.artworks?.filter(
                              (a) => a.museum === museum,
                            ) || [];

                          return (
                            <Box key={idx}>
                              <Flex
                                bg="brand.surface"
                                p="3"
                                px="4"
                                borderTopRadius={"lg"}
                                borderBottomLeftRadius={isExpanded ? "0" : "lg"}
                                borderBottomRightRadius={
                                  isExpanded ? "0" : "lg"
                                }
                                borderWidth="1px"
                                borderColor="brand.border"
                                justify="space-between"
                                align="center"
                                cursor="pointer"
                                _hover={{ bg: "brand.tertiary" }}
                                shadow="sm"
                                onClick={() =>
                                  setExpandedMuseumIndex(
                                    isExpanded ? null : idx,
                                  )
                                }>
                                <Box>
                                  <Text fontWeight="bold" fontSize="md">
                                    {museum}
                                  </Text>
                                  <Text fontSize="sm" color="brand.muted">
                                    40 mins
                                  </Text>
                                </Box>
                                <Icon
                                  as={IoChevronDown}
                                  color="brand.muted"
                                  transform={
                                    isExpanded ? "rotate(180deg)" : "none"
                                  }
                                  transition="transform 0.2s"
                                />
                              </Flex>

                              {isExpanded && (
                                <Flex
                                  direction="column"
                                  gap={3}
                                  p={4}
                                  bg="gray.50"
                                  borderWidth="0 1px 1px 1px"
                                  borderColor="brand.border"
                                  borderTopRadius="0"
                                  borderBottomRadius={"lg"}>
                                  {museumArtworks.length > 0 ? (
                                    museumArtworks.map((artwork, aIdx) => (
                                      <Flex key={aIdx} gap={3} align="center">
                                        {artwork.imageUrl ? (
                                          <Image
                                            src={`./images/${artwork.imageUrl}`}
                                            alt={artwork.title}
                                            boxSize="12"
                                            borderRadius="md"
                                            objectFit="cover"
                                          />
                                        ) : (
                                          <Box
                                            boxSize="12"
                                            bg="brand.placeholder"
                                            borderRadius="md"
                                          />
                                        )}
                                        <Box>
                                          <Text
                                            fontSize="sm"
                                            fontWeight="bold"
                                            lineHeight="tight">
                                            {artwork.title}
                                          </Text>
                                          <Text
                                            fontSize="xs"
                                            color="brand.muted">
                                            Room {artwork.room}
                                          </Text>
                                        </Box>
                                      </Flex>
                                    ))
                                  ) : (
                                    <Text fontSize="sm" color="gray.500">
                                      No specific artworks selected.
                                    </Text>
                                  )}
                                </Flex>
                              )}

                              {idx < selectedRoute.museums.length - 1 && (
                                <Flex align="center" my="1" ml="6">
                                  <Box
                                    w="2px"
                                    h="14"
                                    backgroundImage="linear-gradient(to bottom, #CBD5E0 50%, transparent 50%)"
                                    backgroundSize="100% 8px"
                                  />
                                  <Flex
                                    align="center"
                                    gap="2"
                                    ml="4"
                                    color="brand.muted"
                                    fontSize="sm"
                                    fontWeight="medium">
                                    <Icon as={IoWalkOutline} boxSize="4" />
                                    <Text>10 min | 700m</Text>
                                  </Flex>
                                </Flex>
                              )}
                            </Box>
                          );
                        })
                      ) : (
                        <Text color="gray.500" fontSize="sm">
                          No museums in this route.
                        </Text>
                      )}
                    </Flex>

                    {/* Right Column (Map) */}
                    <Box
                      borderRadius="lg"
                      position="relative"
                      overflow="hidden"
                      minH={{ base: "300px", md: "auto" }}
                      borderWidth="1px"
                      borderColor="brand.border">
                      {expandedMuseumIndex !== null ? (
                        <Flex
                          direction="column"
                          align="center"
                          justify="center"
                          h="full"
                          w="full"
                          bg="brand.surface">
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            flex="1"
                            w="full"
                            bg="brand.surface"
                            p={4}>
                            <Box position="relative" w="full" maxH="270px">
                              <Image
                                src={`/images/${selectedRoute.museums[expandedMuseumIndex]}.jpg`}
                                alt={`${selectedRoute.museums[expandedMuseumIndex]} floor plan`}
                                objectFit="cover"
                                w="full"
                                h="full"
                                maxH="270px"
                              />
                              {selectedRoute.artworks
                                ?.filter(
                                  (a) =>
                                    a.museum ===
                                    selectedRoute.museums[expandedMuseumIndex],
                                )
                                .map((artwork, i) => {
                                  // Mock positions for the floor plan markers
                                  const currentMuseum =
                                    selectedRoute.museums[expandedMuseumIndex];
                                  const museumPositions: Record<
                                    string,
                                    { top: string; left: string }[]
                                  > = {
                                    "Museo Nacional del Prado": [
                                      { top: "40%", left: "30%" },
                                      { top: "60%", left: "70%" },
                                      { top: "30%", left: "60%" },
                                      { top: "80%", left: "40%" },
                                    ],
                                    "Museo Reina Sofía": [
                                      { top: "20%", left: "30%" },
                                      { top: "70%", left: "20%" },
                                      { top: "50%", left: "80%" },
                                      { top: "20%", left: "70%" },
                                    ],
                                    "Museo Nacional Thyssen-Bornemisza": [
                                      { top: "75%", left: "80%" },
                                      { top: "45%", left: "65%" },
                                      { top: "10%", left: "25%" },
                                      { top: "50%", left: "50%" },
                                    ],
                                  };
                                  const defaultPositions = [
                                    { top: "35%", left: "24%" },
                                    { top: "60%", left: "65%" },
                                    { top: "35%", left: "75%" },
                                    { top: "70%", left: "45%" },
                                    { top: "50%", left: "50%" },
                                  ];

                                  const activePositions =
                                    museumPositions[currentMuseum] ||
                                    defaultPositions;
                                  const pos =
                                    activePositions[i % activePositions.length];
                                  return (
                                    <Box
                                      key={i}
                                      position="absolute"
                                      top={pos.top}
                                      left={pos.left}
                                      transform="translate(-50%, -100%)"
                                      zIndex={2}>
                                      <Icon
                                        as={IoLocationSharp}
                                        boxSize="8"
                                        color="red.500"
                                      />
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
                                  );
                                })}
                            </Box>
                            <Flex gap={2} wrap="wrap" justify="center" mt={2}>
                              {selectedRoute.artworks
                                ?.filter(
                                  (a) =>
                                    a.museum ===
                                    selectedRoute.museums[expandedMuseumIndex],
                                )
                                .map((artwork, i) => (
                                  <Box
                                    key={i}
                                    px={3}
                                    py={1.5}
                                    bg="brand.primary"
                                    color="white"
                                    borderRadius="full"
                                    fontSize="xs"
                                    fontWeight="bold"
                                    shadow="sm">
                                    {artwork.title} • Room {artwork.room}
                                  </Box>
                                ))}
                            </Flex>
                          </Flex>
                        </Flex>
                      ) : (
                        <>
                          <Image
                            src="/images/madrid-map.png"
                            alt="Map of central Madrid with museum locations"
                            objectFit="cover"
                            w="full"
                            h="full"
                          />
                          {/* SVG Path Overlay - Google Maps Walking Style */}
                          <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            width="100%"
                            height="100%"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 1,
                              filter:
                                "drop-shadow(0px 1px 2px rgba(0,0,0,0.3))",
                            }}>
                            {/* White halo/outline */}
                            <path
                              d="M 36 18 L 40 20 L 40 28 L 48 38 L 48 50 L 42 60 L 42 78 L 38 88"
                              fill="transparent"
                              stroke="white"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray="0 12"
                              vectorEffect="non-scaling-stroke"
                            />
                            {/* Blue dots */}
                            <path
                              d="M 36 18 L 40 20 L 40 28 L 48 38 L 48 50 L 42 60 L 42 78 L 38 88"
                              fill="transparent"
                              stroke="#1A73E8"
                              strokeWidth="5"
                              strokeLinecap="round"
                              strokeDasharray="0 12"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          {/* Markers for the 3 museums */}
                          {[
                            { top: "18%", left: "36%" }, // Thyssen-Bornemisza
                            { top: "38%", left: "48%" }, // Prado
                            { top: "88%", left: "38%" }, // Reina Sofía
                          ].map((pos, i) => (
                            <Box
                              key={i}
                              position="absolute"
                              top={pos.top}
                              left={pos.left}
                              transform="translate(-50%, -100%)"
                              zIndex={2}>
                              <Icon
                                as={IoLocationSharp}
                                boxSize="10"
                                color="brand.primary"
                              />
                              <Box
                                position="absolute"
                                top="8px"
                                left="50%"
                                transform="translateX(-50%)"
                                w="3"
                                h="3"
                                bg="white"
                                borderRadius="full"
                              />
                            </Box>
                          ))}
                        </>
                      )}
                    </Box>
                  </Grid>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" w="full" maxW="1299px" mt="4">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Wishlist: {savedArtworks.length} items
          </Text>
          <Flex overflowX="auto" gap="6" pb="4" w="full">
            {savedArtworks.map((artwork, index) => (
              <Box key={index} minW="320px">
                <RouteArtworkCard {...artwork} />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <CreateRouteDialog
        isOpen={isCreateRouteOpen}
        onClose={() => setIsCreateRouteOpen(false)}
      />
    </Flex>
  );
}
