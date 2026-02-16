
// import React from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { LogOut, User } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { cn } from '../../lib/utils';

// interface NavbarProps {
//   toggleSidebar?: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
//   const { user, logout } = useAuth();

//   const isAdmin = user?.role === 'admin';
//   const profilePath = isAdmin ? '/admin/profile' : '/student/profile';

//   const getInitials = () => {
//     if (user?.firstName && user?.lastName) {
//       return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
//     }
//     return user?.email[0].toUpperCase() || 'U';
//   };

//   return (
//     <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         <div className="mr-4 hidden md:flex">
//           <Link to={isAdmin ? '/admin/dashboard' : '/student/dashboard'} className="mr-6 flex items-center space-x-2">
//             <span className="hidden font-bold sm:inline-block text-xl">
//               Placement Tracker {isAdmin && '- Admin'}
//             </span>
//           </Link>
//         </div>
        

//         <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
//           <div className="w-full flex-1 md:w-auto md:flex-none"></div>

//           <div className="flex items-center gap-2">
//             {isAdmin ? (
//               <Button variant="outline" size="sm" onClick={logout} className="h-9">
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Logout</span>
//               </Button>
//             ) : (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="relative h-9 w-9 rounded-full">
//                     <Avatar className="h-9 w-9">
//                       <AvatarFallback>{getInitials()}</AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem asChild>
//                     <Link to={profilePath} className="cursor-pointer">
//                       <User className="mr-2 h-4 w-4" />
//                       <span>Profile</span>
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={logout} className="cursor-pointer">
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Logout</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from '../../lib/utils';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const profilePath = isAdmin ? '/admin/profile' : '/student/profile';

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  const getDashboardPath = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isStudent) return '/student/dashboard';
    return '/';
  };

  const getTitleSuffix = () => {
    if (isAdmin) return '- Admin';
    if (isStudent) return '- Student';
    return '';
  };

  return (
    <header className="fixed top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <Link to={getDashboardPath()} className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-base lg:text-xl">
              Placement Tracker {getTitleSuffix()}
            </span>
          </Link>
        </div>

        {/* Mobile Title */}
        <div className="flex md:hidden flex-1 ml-12">
          <Link to={getDashboardPath()} className="flex items-center">
            <span className="font-bold text-base">
              PT {getTitleSuffix()}
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Button variant="outline" size="sm" onClick={logout} className="h-9">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={profilePath} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
