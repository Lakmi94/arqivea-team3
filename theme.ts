import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          bg: { value: "#F7FAFC" }, // equivalent to gray.50
          text: { value: "#1A202C" }, // equivalent to gray.800
          muted: { value: "#718096" }, // equivalent to gray.600
          lightMuted: { value: "#A0AEC0" }, // equivalent to gray.500
          border: { value: "#CBD5E0" }, // equivalent to gray.300
          surface: { value: "#FFFFFF" }, // equivalent to white
          primary: { value: "#1A202C" }, // equivalent to gray.800
          primaryHover: { value: "#2D3748" }, // equivalent to gray.700
          placeholder: { value: "#E2E8F0" }, // equivalent to gray.200
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);