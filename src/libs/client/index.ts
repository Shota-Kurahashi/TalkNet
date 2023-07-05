import { QueryClient } from "@tanstack/react-query";
import Axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      suspense: true,
      useErrorBoundary: true,
      refetchOnMount: false,
    },
  },
});

export const axios = Axios.create({
  baseURL: "/api",
});
