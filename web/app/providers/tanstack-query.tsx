"use client";

import { getClient } from "@/shared/lib/tanstack-query/client";
import { QueryClientProvider } from "@tanstack/react-query";

const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
