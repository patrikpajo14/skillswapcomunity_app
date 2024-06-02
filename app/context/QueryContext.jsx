"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const QueryContext = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
};

export default QueryContext;
