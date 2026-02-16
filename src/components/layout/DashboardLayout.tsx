
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Toaster } from 'sonner';
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
  variant: 'admin' | 'student';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ variant }) => {
  const { user, isAuthenticated } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Check role access
  if (variant === 'admin' && user.role !== 'admin') {
    return <Navigate to="/student/dashboard" />;
  }

  if (variant === 'student' && user.role !== 'student') {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar variant={variant} onCollapseChange={setIsSidebarCollapsed} />
        <main 
          className={cn(
            "flex-1 w-full transition-all duration-300",
            isSidebarCollapsed ? "md:ml-[80px]" : "md:ml-[260px]"
          )}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
