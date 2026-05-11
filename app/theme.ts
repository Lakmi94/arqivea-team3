import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      backgroundColor: "var(--color-bg-page)",
      color: "var(--color-text-primary)",
      fontFamily: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
        body: { value: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
        sans: { value: "BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
      },

      colors: {
        brand: {
          surface: { value: "var(--color-surface-default)" },
          text: { value: "var(--color-text-primary)" },
          muted: { value: "var(--color-text-secondary)" },
          lightMuted: { value: "var(--color-text-secondary)" },
          border: { value: "var(--color-text-muted)" },
          placeholder: { value: "var(--color-surface-soft-warm)" },
          primary: { value: "var(--color-action-primary)" },
          primaryText: { value: "var(--color-action-primary-text)" },
          primaryHover: { value: "var(--color-action-primary-hover)" },
          tertiary: { value: "var(--color-surface-soft-warm)" },
        },
      },
    },
  },
});