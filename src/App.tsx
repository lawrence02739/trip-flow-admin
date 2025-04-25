import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";

// Page imports
import Index from "./pages/Index";
import { Agents } from "./pages/Agents";
import { Bookings } from "./pages/Bookings";
import { Passengers } from "./pages/Passengers";
import { Payments } from "./pages/Payments";
import { Users } from "./pages/Users";
import { Roles } from "./pages/Roles";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ManageMarkup } from "./pages/ManageMarkup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Index />
            </MainLayout>
          } />
          <Route path="/manage-markup" element={
            <MainLayout>
              <ManageMarkup />
            </MainLayout>
          } />
          <Route path="/agents" element={
            <MainLayout>
              <Agents />
            </MainLayout>
          } />
          <Route path="/bookings" element={
            <MainLayout>
              <Bookings />
            </MainLayout>
          } />
          <Route path="/passengers" element={
            <MainLayout>
              <Passengers />
            </MainLayout>
          } />
          <Route path="/payments" element={
            <MainLayout>
              <Payments />
            </MainLayout>
          } />
          <Route path="/users" element={
            <MainLayout>
              <Users />
            </MainLayout>
          } />
          <Route path="/roles" element={
            <MainLayout>
              <Roles />
            </MainLayout>
          } />
          <Route path="/settings" element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
