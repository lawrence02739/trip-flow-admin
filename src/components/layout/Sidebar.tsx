
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Users,
  Calendar,
  User,
  CreditCard,
  Settings,
  Shield,
  FileText
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'Agents', icon: Users, path: '/agents' },
  { title: 'Bookings', icon: Calendar, path: '/bookings' },
  { title: 'Passengers', icon: User, path: '/passengers' },
  { title: 'Payments', icon: CreditCard, path: '/payments' },
  { title: 'Markup Management', icon: FileText, path: '/manage-markup' },
  { title: 'User Management', icon: Users, path: '/users' },
  { title: 'Roles & Permissions', icon: Shield, path: '/roles' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  return (
    <aside 
      className={`bg-sidebar fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        <Link to="/" className="flex items-center justify-center">
          {collapsed ? (
            <span className="text-2xl font-bold text-sidebar-foreground">TV</span>
          ) : (
            <span className="text-xl font-bold text-sidebar-foreground">Trip Vista</span>
          )}
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-3 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-travel-teal text-white'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? 'mr-0' : 'mr-3'}`} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-3'}`}>
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-white">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-white/70">System Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
