"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ArtworkCardProps } from "../components/artworkCard";

export interface Route {
  id: string;
  name: string;
  museums: string[];
  date: string;
  stopsCount: number;
  artworks: ArtworkCardProps[];
  isCompleted?: boolean;
}

interface RoutesContextType {
  routes: Route[];
  addRoute: (route: Route) => void;
  toggleRouteCompletion: (id: string) => void;
  deleteRoute: (id: string) => void;
}

const RoutesContext = createContext<RoutesContextType | undefined>(undefined);

const defaultRoutes: Route[] = [
  {
    id: "demo-route-1",
    name: "Madrid's Golden Triangle",
    museums: ["Museo Nacional del Prado", "Museo Reina Sofía", "Museo Nacional Thyssen-Bornemisza"],
    date: "03/05/2026",
    stopsCount: 3,
    isCompleted: false,
    artworks: [
      {
        title: "Las Meninas",
        artist: "Diego Velázquez",
        museum: "Museo Nacional del Prado",
        city: "Madrid",
        room: "Room 012",
        medium: "Oil on canvas",
        displayStatus: "On display",
        recommendationTag: "Recommended",
        tags: ["17th Century", "Spain", "Portrait", "Oil", "Canvas", "Painting", "Royalty"],
        imageUrl: "LasMeninas.jpg",
        accessionNumber: "P00001",
        year: "1656",
        dimensions: "318 x 276 cm",
        academicNotes: "Velázquez’s Las Meninas (1656) is a complex masterpiece."
      },
      {
        title: "Bust of a Young Woman",
        artist: "Pablo Picasso",
        museum: "Museo Reina Sofía",
        city: "Madrid",
        room: "Room 8, Floor 2",
        medium: "Oil on canvas",
        displayStatus: "On display",
        recommendationTag: "Must see!",
        tags: ["20th Century", "Spain", "Portrait", "Oil", "Canvas", "Painting"],
        imageUrl: "BustofaYoungWoman.jpeg",
        accessionNumber: "AS00001",
        year: "1906",
        dimensions: "55 x 46 cm",
        academicNotes: "Picasso’s Bust of a Young Woman (1906) is a seminal work from his Rose Period, showcasing his evolving style and emotional depth in portraiture."
      },
      {
        title: "Saint Catherine of Alexandria",
        artist: "Caravaggio (Michelangelo Merisi)",
        museum: "Museo Nacional Thyssen-Bornemisza",
        city: "Madrid",
        room: "Room 6",
        medium: "Oil on canvas",
        displayStatus: "On display",
        recommendationTag: "Must see!",
        tags: ["16th Century", "Italy", "Religious", "Oil", "Canvas", "Painting"],
        imageUrl: "SaintCatherineofAlexandria.jpg",
        accessionNumber: "CTB.1998.16",
        year: "1598",
        dimensions: "161 x 128 cm",
        academicNotes: "Caravaggio’s Saint Catherine of Alexandria (circa 1598) is a masterwork by Caravaggio, depicting the martyred saint with dramatic chiaroscuro."
      }
    ]
  }
];

export function RoutesProvider({ children }: { children: ReactNode }) {
  const [routes, setRoutes] = useState<Route[]>(defaultRoutes);

  const addRoute = (route: Route) => {
    setRoutes((prev) => [...prev, route]);
  };

  const toggleRouteCompletion = (id: string) => {
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === id ? { ...route, isCompleted: !route.isCompleted } : route
      )
    );
  };

  const deleteRoute = (id: string) => {
    setRoutes((prev) => prev.filter((route) => route.id !== id));
  };

  return (
    <RoutesContext.Provider value={{ routes, addRoute, toggleRouteCompletion, deleteRoute }}>
      {children}
    </RoutesContext.Provider>
  );
}

export function useRoutes() {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error("useRoutes must be used within a RoutesProvider");
  }
  return context;
}