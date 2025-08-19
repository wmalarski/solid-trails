import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import { ErrorFallback } from "./modules/common/error-fallback";
import { Head } from "./modules/common/head";
import { I18nContextProvider } from "./utils/i18n";

export default function App() {
  return (
    <Router
      root={(props) => (
        <I18nContextProvider>
          <MetaProvider>
            <Head />
            <ErrorBoundary fallback={ErrorFallback}>
              <Suspense>{props.children}</Suspense>
            </ErrorBoundary>
          </MetaProvider>
        </I18nContextProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
