"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "../theme"
import { FilterProvider } from "../app/context/FilterContext"
import { RoutePlannerProvider } from "./context/RoutePlannerContext"
import { RoutesProvider } from "./context/RoutesContext"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <RoutesProvider>
        <RoutePlannerProvider>
          <FilterProvider>
            {children}
          </FilterProvider>
        </RoutePlannerProvider>
      </RoutesProvider>
    </ChakraProvider>
  )
}