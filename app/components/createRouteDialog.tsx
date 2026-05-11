"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  Flex, 
  Text, 
  Input, 
  Button, 
  Icon, 
  Box, 
  Textarea,
  DatePicker,
  Portal
} from "@chakra-ui/react";
import { IoClose, IoChevronForward } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { useRoutePlanner } from "../context/RoutePlannerContext";
import { today, getLocalTimeZone } from "@internationalized/date";
import SelectArtworkCard from "./selectArtworkCard";
import { ArtworkCardProps } from "./artworkCard";
import { useRoutes } from "../context/RoutesContext";

interface CreateRouteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRouteDialog({ isOpen, onClose }: CreateRouteDialogProps) {
  const [step, setStep] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { savedArtworks, clearSelectedForNewRoute, selectedForNewRoute, removeSavedArtworks } = useRoutePlanner();
  const { addRoute } = useRoutes();

  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");

  const [suggestedArtworks, setSuggestedArtworks] = useState<ArtworkCardProps[]>([]);

  useEffect(() => {
    fetch("/artworks.json")
      .then((res) => res.json())
      .then((data) => {
        const spainAndModern = data.artworks.filter((artwork: ArtworkCardProps) => {
          const artworkText = JSON.stringify(artwork).toLowerCase();
          return artworkText.includes("spain") && artworkText.includes("modern");
        });
        setSuggestedArtworks(spainAndModern.slice(-3));
      })
      .catch((err) => console.error("Error fetching suggested artworks:", err));
  }, []);

  // Extract a unique list of museums from the selected artworks
  const uniqueMuseums = Array.from(new Set(selectedForNewRoute.map((a) => a.museum)));

  const steps = ["Details", "Add artworks", "Review & confirm"];

  const isStep1Valid =
    routeName.trim() !== "" &&
    routeDescription.trim() !== "" &&
    visitDate.trim() !== "" &&
    (durationHours.trim() !== "" || durationMinutes.trim() !== "");

  const resetState = () => {
    setStep(1);
    setShowSuggestions(false);
    setRouteName("");
    setRouteDescription("");
    setVisitDate("");
    setDurationHours("");
    setDurationMinutes("");
    clearSelectedForNewRoute();
  };

  const handleContinue = () => {
    if (step === 2 && !showSuggestions) {
      setShowSuggestions(true);
    } else if (step < steps.length) {
      setStep(step + 1);
    } else {
      // Handle final submit here
      addRoute({
        id: Date.now().toString(),
        name: routeName || "Untitled Route",
        museums: uniqueMuseums,
        date: visitDate ? visitDate.split('-').reverse().join('/') : "Not set",
        stopsCount: uniqueMuseums.length,
        artworks: selectedForNewRoute,
        isCompleted: false,
      });
      removeSavedArtworks(selectedForNewRoute);
      onClose();
      resetState(); // Reset for next time
    }
  };

  const handleCancel = () => {
    if (step === 2 && showSuggestions) {
      setShowSuggestions(false);
    } else if (step > 1) {
      // Optional: change this to onClose() if you want Cancel to strictly close the modal
      setStep(step - 1); 
    } else {
      onClose();
      resetState();
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
          resetState(); // Reset step and fields when closed by clicking outside
        }
      }}
    >
      <Dialog.Backdrop bg="blackAlpha.600" />
      <Dialog.Positioner display="flex" alignItems="center" justifyContent="center">
        <Dialog.Content
          bg="brand.surface"
          color="brand.text"
          borderRadius="xl"
          minW="500px"
          h="700px"
          display="flex"
          flexDir="column"
          shadow="2xl"
          position="relative"
          overflow="hidden"
        >
          {/* Close Button */}
          <Dialog.CloseTrigger position="absolute" top="4" right="4" cursor="pointer" zIndex={10}>
            <Icon as={IoClose} boxSize="6" color="brand.muted" _hover={{ color: "brand.primaryText" }} />
          </Dialog.CloseTrigger>

          {/* Header */}
          <Dialog.Header pt={6} pb={4} px={8}>
            <Flex flexDir="column">
              <Text color="gray.500" fontSize="md">New Route</Text>
              <Dialog.Title fontSize="3xl" fontWeight="bold">
                Plan your visit
              </Dialog.Title>
            </Flex>
          </Dialog.Header>

          {/* Stepper Status Bar */}
          <Box borderTopWidth="1px" borderBottomWidth="1px" borderColor="brand.border" px={8} py={3} bg="brand.surface">
            <Flex align="center" gap={4}>
              {steps.map((label, index) => {
                const stepNum = index + 1;
                const isActive = step === stepNum;
                const isPast = step > stepNum;
                // Active or past steps get the primary styling, future steps use tertiary
                const isHighlighted = isActive || isPast; 

                return (
                  <Flex key={label} align="center" gap={4}>
                    <Flex align="center" gap={2} color={isHighlighted ? "brand.primaryText" : "#332f2a"}>
                      <Flex
                        w={6}
                        h={6}
                        borderRadius="full"
                        bg={isHighlighted ? "brand.primary" : "brand.tertiary"}
                        color={isHighlighted ? "brand.primaryText" : "#332f2a"}
                        align="center"
                        justify="center"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {stepNum}
                      </Flex>
                      <Text fontWeight={isActive ? "medium" : "normal"}>{label}</Text>
                    </Flex>
                    {/* Add separator except for the last item */}
                    {index < steps.length - 1 && (
                      <Icon as={IoChevronForward} color="brand.border" />
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </Box>

          {/* Form Body - Conditionally rendered based on 'step' */}
          <Dialog.Body px={8} py={6} bg="white" flex="1" overflowY="auto">
            {step === 1 && (
              <Flex flexDir="column" gap={5}>
                <Box>
                  <label htmlFor="routeName">
                    <Text display="block" mb="2" color="brand.primaryText">Route name *</Text>
                  </label>
                  <Input
                    id="routeName"
                    borderColor="brand.muted"
                    borderRadius="md"
                    size="lg"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                  />
                </Box>
                <Box>
                  <label htmlFor="routeDescription">
                    <Text display="block" mb="2" color="brand.primaryText">Route description *</Text>
                  </label>
                  <Textarea
                    id="routeDescription"
                    borderColor="brand.muted"
                    borderRadius="md"
                    size="lg"
                    rows={2}
                    resize="none"
                    value={routeDescription}
                    onChange={(e) => setRouteDescription(e.target.value)}
                  />
                </Box>
                <Box>
                  <DatePicker.Root
                    w="full"
                    min={today(getLocalTimeZone())}
                    onValueChange={(e) => {
                      // Extracts the string format from the Ark UI DatePicker
                      const newDate = e.valueAsString[0] || "";
                      setVisitDate(newDate);
                      console.log("Visit date selected:", newDate);
                    }}
                  >
                    <DatePicker.Label mb="2" color="gray.500" display="block">Visit date *</DatePicker.Label>
                    <DatePicker.Control>
                      <DatePicker.Input
                        placeholder="DD/MM/YYYY"
                        borderColor="brand.muted"
                        borderRadius="md"
                        // size="lg"
                      />
                      <DatePicker.IndicatorGroup pr="3">
                        <DatePicker.Trigger>
                          <Icon as={LuCalendar} color="gray.500" />
                        </DatePicker.Trigger>
                      </DatePicker.IndicatorGroup>
                    </DatePicker.Control>
                    <Portal>
                      <DatePicker.Positioner>
                        <DatePicker.Content bg="white" shadow="xl" borderRadius="md" p="4" zIndex="popover" borderWidth="1px" borderColor="brand.border">
                          <DatePicker.View view="day">
                            <DatePicker.Header />
                            <DatePicker.DayTable />
                          </DatePicker.View>
                          <DatePicker.View view="month">
                            <DatePicker.Header />
                            <DatePicker.MonthTable />
                          </DatePicker.View>
                          <DatePicker.View view="year">
                            <DatePicker.Header />
                            <DatePicker.YearTable />
                          </DatePicker.View>
                        </DatePicker.Content>
                      </DatePicker.Positioner>
                    </Portal>
                  </DatePicker.Root>
                </Box>
                <Box>
                  <Text display="block" mb="2" color="brand.primaryText">Route duration *</Text>
                  <Flex gap={4}>
                    <Flex align="center" gap={2} flex={1}>
                      <Input
                        aria-label="Duration hours"
                        type="number"
                        placeholder="0"
                        min={0}
                        borderColor="brand.muted"
                        borderRadius="md"
                        size="lg"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                      />
                      <Text color="brand.primaryText">hrs</Text>
                    </Flex>
                    <Flex align="center" gap={2} flex={1}>
                      <Input
                        aria-label="Duration minutes"
                        type="number"
                        placeholder="00"
                        min={0}
                        max={59}
                        borderColor="brand.muted"
                        borderRadius="md"
                        size="lg"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                      />
                      <Text color="brand.primaryText">mins</Text>
                    </Flex>
                  </Flex>
                </Box>
                <Text fontSize="sm" color="brand.muted" mt={-2}>* Required fields</Text>
              </Flex>
            )}

            {step === 2 && !showSuggestions && (
              <Flex
                flexDir="column"
                gap={4}
                maxH="400px"
                overflowY="scroll"
                pr={5}
                _scrollbar={{ width: "6px" }}
                _scrollbarTrack={{ bg: "transparent" }}
                _scrollbarThumb={{ bg: "brand.border", borderRadius: "full" }}
              >
                <Text>Add from the wishlist - {savedArtworks.length} artworks</Text>
                {savedArtworks.length > 0 ? (
                  savedArtworks.map((artwork, index) => (
                    <Box key={index}>
                      <SelectArtworkCard {...artwork} />
                    </Box>
                  ))
                ) : (
                  <Box py={10} textAlign="center">
                    <Text color="gray.500">Your wishlist is empty. Save artworks to your wishlist first!</Text>
                  </Box>
                )}
              </Flex>
            )}

            {step === 2 && showSuggestions && (
              <Flex
                flexDir="column"
                gap={4}
                maxH="400px"
                overflowY="scroll"
                pr={5}
                _scrollbar={{ width: "6px" }}
                _scrollbarTrack={{ bg: "transparent" }}
                _scrollbarThumb={{ bg: "brand.border", borderRadius: "full" }}
              >
                <Text>Add from suggested artworks (optional)</Text>
                {suggestedArtworks.length > 0 ? (
                  suggestedArtworks.map((artwork, index) => (
                    <Box key={index}>
                      <SelectArtworkCard {...artwork} />
                    </Box>
                  ))
                ) : (
                  <Box py={10} textAlign="center">
                    <Text color="gray.500">No suggestions available at this time.</Text>
                  </Box>
                )}
              </Flex>
            )}

            {step === 3 && (
              <Flex flexDir="column" gap={6}>
                {/* Summary Box */}
                <Box bg="gray.50" borderRadius="lg" p={5} borderWidth="1px" borderColor="brand.border">
                  <Flex direction="column" gap={3} fontSize="md">
                    <Flex justify="space-between">
                      <Text color="brand.muted">Route name:</Text>
                      <Text color="brand.primaryText" textAlign="right">{routeName || "Untitled Route"}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="brand.muted">Museums:</Text>
                      <Flex direction="column" align="flex-end">
                        {uniqueMuseums.length > 0
                          ? uniqueMuseums.map((museum) => (
                              <Text key={museum} color="brand.primaryText" textAlign="right">{museum}</Text>
                            ))
                          : <Text color="brand.primaryText" textAlign="right">None</Text>}
                      </Flex>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="brand.muted">Date:</Text>
                      <Text color="brand.primaryText" textAlign="right">
                        {visitDate ? visitDate.split('-').reverse().join('/') : "Not set"}
                      </Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="brand.muted">Durations:</Text>
                      <Text color="brand.primaryText" textAlign="right">
                        {durationHours || 0} hours {durationMinutes || 0} minutes
                      </Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="brand.muted"># of stops:</Text>
                      <Text color="brand.primaryText" textAlign="right">
                        {uniqueMuseums.length}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                {/* Planned Sequence */}
                <Box>
                  <Text color="brand.muted" mb={2}>Planned sequence</Text>
                  <Flex
                    flexDir="column"
                    maxH="200px"
                    overflowY="scroll"
                    pr={4}
                    _scrollbar={{ width: "6px" }}
                    _scrollbarTrack={{ bg: "transparent" }}
                    _scrollbarThumb={{ bg: "brand.border", borderRadius: "full" }}
                  >
                    {selectedForNewRoute.length > 0 ? selectedForNewRoute.map((artwork, index) => (
                      <Flex key={index} justify="space-between" py={3} borderBottomWidth={index !== selectedForNewRoute.length - 1 ? "1px" : "0"} borderColor="gray.200">
                        <Text color="brand.primaryText">{index + 1}. {artwork.title}</Text>
                        <Text color="brand.muted">Room {artwork.room}</Text>
                      </Flex>
                    )) : (
                       <Text color="brand.muted" fontStyle="italic">No artworks selected for this route.</Text>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )}
          </Dialog.Body>

          {/* Footer */}
          <Box borderTopWidth="1px" borderColor="brand.border" px={8} py={5} bg="white">
            <Flex justify="space-between">
              <Button 
                onClick={handleCancel} 
                bg="gray.200" 
                color="black" 
                _hover={{ bg: "gray.300" }} 
                borderRadius="lg" 
                px={8}
                size="lg"
              >
                {step > 1 || showSuggestions ? "Back" : "Cancel"}
              </Button>
              <Button 
                onClick={handleContinue} 
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !showSuggestions && selectedForNewRoute.length === 0) ||
                  (step === 3 && selectedForNewRoute.length === 0)
                }
                bg="brand.primary"
                color="brand.primaryText" 
                _hover={{ bg: "brand.primaryHover" }} 
                borderRadius="lg" 
                px={8}
                size="lg"
              >
                {step === steps.length ? "Create route" : "Continue"}
              </Button>
            </Flex>
          </Box>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}