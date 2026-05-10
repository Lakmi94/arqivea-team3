"use client";

import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Box,
  Icon,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";

import ArtworkCard from "./components/artworkCard";
import Filters from "./components/filters";
import { useFilters } from "./context/FilterContext";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  museum: string;
  city: string;
  room: string;
  medium: string;
  displayStatus: string;
  recommendationTag?: string | null;
  imageUrl: string;
  homePage: boolean;
  academicNotes: string;
  accessionNumber: string;
  year: string;
  dimensions: string;
  tags: string[];
}

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [artworksData, setArtworksData] = useState<{ artworks: Artwork[] }>({
    artworks: [],
  });
  const {
    selectedFilters,
    showResults,
    setShowResults,
    appliedFilters,
    setAppliedFilters,
    clearFilters,
    searchQuery,
    setSearchQuery,
    appliedSearchQuery,
    setAppliedSearchQuery,
  } = useFilters();
  console.log("appliedSearchQuery", appliedSearchQuery);

  const flatFilters = Object.values(selectedFilters).flat();

  const isSpainAndModern =
    appliedFilters.length === 2 &&
    appliedFilters.includes("Spain") &&
    appliedFilters.includes("Modern");

  const isSpanishModernSearch =
    appliedSearchQuery.toLowerCase().trim() === "spanish modernism";

  const spainAndModernArtworks = artworksData.artworks
    .filter((artwork) => {
      const artworkText = JSON.stringify(artwork).toLowerCase();
      return artworkText.includes("spain") && artworkText.includes("modern");
    })
    .slice(0, 6);

  useEffect(() => {
    fetch("/artworks.json")
      .then((res) => res.json())
      .then((data) => setArtworksData(data))
      .catch((err) => console.error("Error fetching artworks:", err));
  }, []);

  useEffect(() => {
    if (flatFilters.length === 0 && appliedFilters.length > 0) {
      setAppliedFilters([]);
      if (appliedSearchQuery.trim() === "") {
        setShowResults(false);
      }
    }
  }, [
    flatFilters.length,
    appliedFilters.length,
    appliedSearchQuery,
    setAppliedFilters,
    setShowResults,
  ]);

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    clearFilters(); // Clears active filters when running a search
    setShowResults(true);
  };

  return (
    <Flex
      p="6"
      direction="column"
      flex="1"
      align="center"
      bg="brand.bg"
      fontFamily="sans"
      color="brand.text">
        <Flex  direction="column"
     >
            <Heading as="h1" fontSize="3xl" fontWeight="bold" mt="4">
        Discovery
      </Heading>
      <Text mt="4" fontSize="lg" color="brand.muted">
        Hyper-search & Academic Gallery
      </Text>
        </Flex>
    

      <Flex
        mt="8"
        p="3"
        px="4"
        gap="2"
        borderWidth="1px"
        borderColor="brand.border"
        borderRadius="lg"
        bg="brand.surface"
        align="center"
        w="full"
        maxW="4xl">
        <Icon size="lg" color="">
          <CiSearch />
        </Icon>{" "}
        <Input
          ml="-13px"
          id="search"
          type="text"
          placeholder="Search for artworks, artists, museums, or vibes..."
          flex="1"
          border="none"
          _focus={{ border: "none", boxShadow: "none", outline: "none" }}
          value={searchQuery}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.length < searchQuery.length) {
              setAppliedSearchQuery(newValue);
            }
            setSearchQuery(newValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {searchQuery.trim().length > 0 && (
          <Button
            px="6"
            py="2"
            mr="2"
            variant="outline"
            borderColor="brand.border"
            onClick={handleSearch}>
            <Icon size="lg" color="">
              <CiSearch />
            </Icon>
            Search
          </Button>
        )}
        <Button
          px="6"
          py="2"
          bg="brand.primary"
          color="white"
          _hover={{ bg: "brand.primaryHover" }}
          transition="colors 0.2s"
          onClick={() => setShowFilters(!showFilters)}>
          <Icon size="lg" color="">
            <IoFilterOutline />
          </Icon>
          Filters
        </Button>
      </Flex>
      {showFilters && (
        <Box w="full" maxW="4xl" mt="4">
          <Filters
            onApply={() => {
              setSearchQuery(""); // Clears search bar text
              setAppliedSearchQuery(""); // Clears active search state
              if (flatFilters.length > 0) {
                setAppliedFilters(flatFilters);
                setShowResults(true);
              } else {
                // If user applies zero filters, reset to the recommended view
                setAppliedFilters([]);
                setShowResults(false);
              }
              setShowFilters(false);
            }}
          />
        </Box>
      )}
      {!showResults ||
      (appliedFilters.length === 0 && appliedSearchQuery.trim() === "") ? (
        <Flex direction={"column"}>
          <Text>Recommended artwork</Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={6}
            mt="12"
            w="full"
            maxW="6xl"
            position={"relative"}>
            {artworksData.artworks.map(
              (artwork) =>
                artwork.homePage === true && (
                  <ArtworkCard
                    key={artwork.id}
                    title={artwork.title}
                    artist={artwork.artist}
                    academicNotes={artwork.academicNotes}
                    imageUrl={artwork.imageUrl}
                    recommendationTag={artwork.recommendationTag ?? undefined}
                    museum={artwork.museum}
                    city={artwork.city}
                    room={artwork.room}
                    medium={artwork.medium}
                    displayStatus={artwork.displayStatus}
                    accessionNumber={artwork.accessionNumber}
                    year={artwork.year}
                    dimensions={artwork.dimensions}
                    tags={artwork.tags}
                  />
                ),
            )}
          </SimpleGrid>
        </Flex>
      ) : isSpainAndModern || isSpanishModernSearch ? (
        <Flex direction="column" w="full" align="center">
          <Text>{`${spainAndModernArtworks.length} results found for "Spain" + "Modernism"`}</Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={6}
            mt="12"
            w="full"
            maxW="6xl"
            position={"relative"}>
            {spainAndModernArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                title={artwork.title}
                academicNotes={artwork.academicNotes}
                imageUrl={artwork.imageUrl}
                recommendationTag={artwork.recommendationTag ?? undefined}
                museum={artwork.museum}
                city={artwork.city}
                room={artwork.room}
                artist={artwork.artist}
                medium={artwork.medium}
                displayStatus={artwork.displayStatus}
                accessionNumber={artwork.accessionNumber}
                year={artwork.year}
                dimensions={artwork.dimensions}
                tags={artwork.tags}
              />
            ))}
          </SimpleGrid>
        </Flex>
      ) : (
        <Flex mt="8">
          <Text fontSize="md" color="brand.muted">
            {appliedSearchQuery.trim().length > 0
              ? `No results found for "${appliedSearchQuery}"`
              : `No results found for ${appliedFilters.join(" + ")}`}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
