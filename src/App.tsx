
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Admin Routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobsList from "./pages/admin/AdminJobsList";
import AdminCreateJob from "./pages/admin/AdminCreateJob";
import AdminJobDetail from "./pages/admin/AdminJobDetail";
import AdminStudentsList from "./pages/admin/AdminStudentsList";
import AdminApplicationsList from "./pages/admin/AdminApplicationsList";

// Student Routes
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentJobsList from "./pages/student/StudentJobsList";
import StudentJobDetail from "./pages/student/StudentJobDetail";
import StudentApplications from "./pages/student/StudentApplications";
import StudentProfile from "./pages/student/StudentProfile";

// Initialize sample data
import { initializeSampleData } from "./services/dataService";
import { useEffect } from "react";
import AdminApplicationDetail from "./pages/admin/AdminApplicationDetail";

const queryClient = new QueryClient();

const App = () => {
  // Initialize sample data on first load
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* <Sonner /> */}
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<DashboardLayout variant="admin" />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="jobs" element={<AdminJobsList />} />
                <Route path="jobs/create" element={<AdminCreateJob />} />
                <Route path="jobs/:jobId" element={<AdminJobDetail />} />
                <Route path="students" element={<AdminStudentsList />} />
                <Route path="applications" element={<AdminApplicationsList />} />
                <Route path="/admin/applications/:id" element={<AdminApplicationDetail />} />
              </Route>
              
              {/* Student Routes */}
              <Route path="/student" element={<DashboardLayout variant="student" />}>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="jobs" element={<StudentJobsList />} />
                <Route path="jobs/:jobId" element={<StudentJobDetail />} />
                <Route path="applications" element={<StudentApplications />} />
                <Route path="profile" element={<StudentProfile />} />
              </Route>
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
