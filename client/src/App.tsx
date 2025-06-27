import { Switch, Route } from "wouter";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { store } from "./store";
import { apolloClient } from "./lib/apollo";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/overview" component={Dashboard} />
      <Route path="/user-stats" component={Dashboard} />
      <Route path="/analytics" component={Dashboard} />
      <Route path="/notifications" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
