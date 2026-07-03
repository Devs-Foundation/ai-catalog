import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";
import ProvidersPage from "@/pages/providers";
import ProviderDetailPage from "@/pages/providers/[id]";
import ModelDetailPage from "@/pages/models/[id]";
import HomePage from "@/pages/home";
import ComparePage from "@/pages/compare";
import LocalLlmsPage from "@/pages/local-llms";
import { CompareProvider } from "@/lib/CompareContext";
import { CompareBar } from "@/components/models/CompareBar";
import { LanguageProvider } from "@/lib/LanguageContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/providers" component={ProvidersPage} />
        <Route path="/providers/:id" component={ProviderDetailPage} />
        <Route path="/models/:id" component={ModelDetailPage} />
        <Route path="/compare" component={ComparePage} />
        <Route path="/local-llms" component={LocalLlmsPage} />
        <Route component={NotFound} />
      </Switch>
      <CompareBar />
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <CompareProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </CompareProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
