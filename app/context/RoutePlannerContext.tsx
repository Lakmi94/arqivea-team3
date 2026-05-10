"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ArtworkCardProps } from "../components/artworkCard";

interface RoutePlannerContextType {
  savedArtworks: ArtworkCardProps[];
  toggleSavedArtwork: (artwork: ArtworkCardProps) => void;
  isArtworkSaved: (title: string) => boolean;
  selectedForNewRoute: ArtworkCardProps[];
  toggleSelectedForNewRoute: (artwork: ArtworkCardProps) => void;
  isSelectedForNewRoute: (title: string) => boolean;
  clearSelectedForNewRoute: () => void;
  removeSavedArtworks: (artworksToRemove: ArtworkCardProps[]) => void;
}

const RoutePlannerContext = createContext<RoutePlannerContextType | undefined>(undefined);

const defaultSavedArtworks: ArtworkCardProps[] = [
  {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    museum: "Musée du Louvre",
    city: "Paris",
    room: "Salle des États",
    medium: "Oil on poplar panel",
    displayStatus: "On display",
    recommendationTag: "Must see!",
    tags: ["16th Century", "France", "Portrait", "Renaissance", "Oil", "Panel", "Painting"],
    imageUrl: "MonaLisa.jpeg",
    accessionNumber: "INV 779",
    year: "1503",
    dimensions: "77 x 53 cm",
    academicNotes: "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world."
  },
  {
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    museum: "Museum of Modern Art",
    city: "New York",
    room: "Gallery 501",
    medium: "Oil on canvas",
    displayStatus: "On display",
    recommendationTag: "Must see!",
    tags: ["19th Century", "USA", "Landscape", "Post-Impressionism", "Oil", "Canvas", "Painting"],
    imageUrl: "TheStarryNight.jpg",
    accessionNumber: "472.1941",
    year: "1889",
    dimensions: "73.7 x 92.1 cm",
    academicNotes: "The Starry Night is an oil-on-canvas painting by the Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village."
  },
  {
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    museum: "National Gallery",
    city: "London",
    room: "Room 43",
    medium: "Oil on canvas",
    displayStatus: "On display",
    recommendationTag: "Recommended",
    tags: ["19th Century", "UK", "Still Life", "Post-Impressionism", "Oil", "Canvas", "Painting"],
    imageUrl: "Sunflowers.jpg",
    accessionNumber: "NG3863",
    year: "1888",
    dimensions: "92.1 x 73 cm",
    academicNotes: "Sunflowers is the title of two series of still life paintings by the Dutch painter Vincent van Gogh. The first series, executed in Paris in 1887, depicts the flowers lying on the ground, while the second set, made a year later in Arles, shows a bouquet of sunflowers in a vase."
  }
];

export function RoutePlannerProvider({ children }: { children: ReactNode }) {
  const [savedArtworks, setSavedArtworks] = useState<ArtworkCardProps[]>(defaultSavedArtworks);
  const [selectedForNewRoute, setSelectedForNewRoute] = useState<ArtworkCardProps[]>([]);

  const toggleSavedArtwork = (artwork: ArtworkCardProps) => {
    setSavedArtworks((prev) => {
      const isSaved = prev.some((a) => a.title === artwork.title);
      if (isSaved) {
        return prev.filter((a) => a.title !== artwork.title);
      } else {
        return [...prev, artwork];
      }
    });
  };

  const isArtworkSaved = (title: string) => {
    return savedArtworks.some((a) => a.title === title);
  };

  const toggleSelectedForNewRoute = (artwork: ArtworkCardProps) => {
    setSelectedForNewRoute((prev) => {
      const isSelected = prev.some((a) => a.title === artwork.title);
      if (isSelected) {
        return prev.filter((a) => a.title !== artwork.title);
      } else {
        return [...prev, artwork];
      }
    });
  };

  const isSelectedForNewRoute = (title: string) => {
    return selectedForNewRoute.some((a) => a.title === title);
  };

  const clearSelectedForNewRoute = () => {
    setSelectedForNewRoute([]);
  };

  const removeSavedArtworks = (artworksToRemove: ArtworkCardProps[]) => {
    setSavedArtworks((prev) => {
      const titlesToRemove = artworksToRemove.map((a) => a.title);
      return prev.filter((a) => !titlesToRemove.includes(a.title));
    });
  };

  return (
    <RoutePlannerContext.Provider value={{ savedArtworks, toggleSavedArtwork, isArtworkSaved, selectedForNewRoute, toggleSelectedForNewRoute, isSelectedForNewRoute, clearSelectedForNewRoute, removeSavedArtworks }}>
      {children}
    </RoutePlannerContext.Provider>
  );
}

export function useRoutePlanner() {
  const context = useContext(RoutePlannerContext);
  if (!context) {
    throw new Error("useRoutePlanner must be used within a RoutePlannerProvider");
  }
  return context;
}