import { Navigate, Route, Routes } from "react-router-dom";

import { ForgotPasswordLayout } from "./features/auth/layouts/ForgotPasswordLayout";
import { ForgotPassword } from "./features/auth/pages/ForgotPassword";
import Login from "./features/auth/pages/Login";
import { ResetPassword } from "./features/auth/pages/ResetPassword";
import { VerifyOtp } from "./features/auth/pages/VerifyOtp";
import { ProtectedRoute } from "./features/auth/routes/ProtectedRoute";
import { PublicRoute } from "./features/auth/routes/PublicRoute";
import { SIDEBAR_NAV_ITEMS } from "./features/home/data/sidebarNav";
import DashboardLayout from "./features/home/layouts/DashboardLayout";
import DashboardPage from "./features/home/pages/DashboardPage";
import { Toaster } from "./ui/sonner";

export default function App() {
  return (
    <main className="m-0 min-h-screen w-full max-w-none bg-background text-foreground font-sans p-0">
      <Toaster />
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route element={<ForgotPasswordLayout />}>
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/verify-otp" element={<VerifyOtp />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            {SIDEBAR_NAV_ITEMS.filter((item) => item.to !== "/").map((item) => (
              <Route key={item.id} path={item.to} element={<DashboardPage />} />
            ))}

            {/* Route Aliases */}
            <Route path="/analytics" element={<Navigate to="/" replace />} />
            <Route path="/faq" element={<Navigate to="/frequently-asked-questions" replace />} />
            <Route path="/faqs" element={<Navigate to="/frequently-asked-questions" replace />} />
            <Route path="/terms-conditions" element={<Navigate to="/cms/terms" replace />} />
            <Route path="/terms-and-conditions" element={<Navigate to="/cms/terms" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}
