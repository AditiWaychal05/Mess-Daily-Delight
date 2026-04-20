import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.jsx";
import VendorAuth from "./pages/VendorAuth.jsx";
import VendorDashboard from "./pages/VendorDashboard.jsx";
import VendorMenu from "./pages/VendorMenu.jsx";
import VendorOrders from "./pages/VendorOrders.jsx";
import VendorEarnings from "./pages/VendorEarnings.jsx";
import VendorSubscription from "./pages/VendorSubscription.jsx";
import VendorSettings from "./pages/VendorSettings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Vendor auth */}
          <Route path="/vendor/auth" element={<VendorAuth />} />

          {/* Vendor protected routes */}
          <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/menu" element={<ProtectedRoute><VendorMenu /></ProtectedRoute>} />
          <Route path="/vendor/orders" element={<ProtectedRoute><VendorOrders /></ProtectedRoute>} />
          <Route path="/vendor/earnings" element={<ProtectedRoute><VendorEarnings /></ProtectedRoute>} />
          <Route path="/vendor/subscription" element={<ProtectedRoute><VendorSubscription /></ProtectedRoute>} />
          <Route path="/vendor/settings" element={<ProtectedRoute><VendorSettings /></ProtectedRoute>} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
