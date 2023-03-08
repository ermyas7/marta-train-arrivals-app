import { QueryClient, QueryClientProvider } from "react-query";

/**
 * Function for configuring a React-Query client
 * - `retry: false` Disables automatic attempts to get data again after failed requests
 * - `refetchOnWindowFocus: true` Configuration to request data again after the user
 *    sets up the cors proxy server
 */
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true
    }
  }
});

/**
 * React-Query HOC with configured query settings
 */
const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
