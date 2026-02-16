
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CheckSquare,
  User,
  MenuIcon,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useIsMobile } from '../../hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface SidebarProps {
  variant: 'admin' | 'student';
  onCollapseChange?: (collapsed: boolean) => void;
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ variant, onCollapseChange }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Notify parent component about collapse state
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  const adminItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      icon: Briefcase,
      label: 'Job Listings',
      path: '/admin/jobs',
    },
    {
      icon: Users,
      label: 'Students',
      path: '/admin/students',
    },
    {
      icon: CheckSquare,
      label: 'Applications',
      path: '/admin/applications',
    },
  ];

  const studentItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/student/dashboard',
    },
    {
      icon: Briefcase,
      label: 'Job Listings',
      path: '/student/jobs',
    },
    {
      icon: CheckSquare,
      label: 'Applied Jobs',
      path: '/student/applications',
    },
    {
      icon: User,
      label: 'Profile',
      path: '/student/profile',
    },
  ];

  const items = variant === 'admin' ? adminItems : studentItems;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {(!isCollapsed || mobile) && (
          <Link
            to={variant === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
            className="flex items-center gap-2"
          >
            <span className="text-lg font-bold">
              {variant === 'admin' ? 'Admin Portal' : 'Student Portal'}
            </span>
          </Link>
        )}
        {!mobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
            {isCollapsed ? <MenuIcon size={18} /> : <X size={18} />}
          </Button>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'sidebar-item',
                location.pathname === item.path && 'active',
                isCollapsed && !mobile && 'flex-col px-0 py-3'
              )}
            >
              <item.icon className={cn('h-5 w-5', isCollapsed && !mobile && 'h-6 w-6')} />
              {(!isCollapsed || mobile) && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile Sidebar (Sheet/Drawer)
  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-2 top-3 z-40 md:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0">
          <SidebarContent mobile />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Sidebar
  return (
    <aside
      className={cn(
        'fixed top-16 bottom-0 left-0 z-20 hidden md:flex flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-[80px]' : 'w-[260px]'
      )}
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
