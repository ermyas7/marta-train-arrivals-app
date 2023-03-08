import React from "react";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";

/**
 * Clean query client for testing purposes
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

/**
 * Clean theme for testing purposes
 */
const theme: Theme = createTheme();

/**
 * Wrapper for providing the necessary HOCs to test the application
 */
export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

// Headers used by nock
export const nockDefaultReplyHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-credentials": "true"
};
