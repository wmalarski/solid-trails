import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import { ErrorFallback } from "./modules/common/error-fallback";
import { Head } from "./modules/common/head";
import { I18nContextProvider } from "./utils/i18n";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Router
      root={(props) => (
        <QueryClientProvider client={queryClient}>
          <I18nContextProvider>
            <MetaProvider>
              <Head />
              <ErrorBoundary fallback={ErrorFallback}>
                <Suspense>{props.children}</Suspense>
              </ErrorBoundary>
            </MetaProvider>
          </I18nContextProvider>
        </QueryClientProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
