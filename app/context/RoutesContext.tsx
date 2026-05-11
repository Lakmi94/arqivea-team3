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

const defaultRoutes: Route[] = [];

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