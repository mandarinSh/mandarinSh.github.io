import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./components/App.tsx";
import globalStyles from "./styles/GlobalStyles.tsx";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60_000 },
    mutations: { retry: 1 },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/mandarinSh.github.io">
      <QueryClientProvider client={queryClient}>
        <App />
        {globalStyles}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
