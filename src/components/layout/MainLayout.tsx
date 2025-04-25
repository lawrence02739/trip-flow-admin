
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  User, 
  Calendar, 
  CreditCard, 
  Shield, 
  Settings,
  FileText 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from '@/components/ui/sidebar';
import { TopBar } from './TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigationItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Agents', icon: Users, path: '/agents' },
    { title: 'Passengers', icon: User, path: '/passengers' },
    { title: 'Bookings', icon: Calendar, path: '/bookings' },
    { title: 'Payments', icon: CreditCard, path: '/payments' },
    { title: 'Markup Management', icon: FileText, path: '/manage-markup' },
    { title: 'User Management', icon: Users, path: '/users' },
    { title: 'Roles & Permissions', icon: Shield, path: '/roles' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader>
            <div className="flex items-center justify-center h-16">
              <span className="text-xl font-bold text-primary">Trip Vista</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          isActive={isActive}
                          asChild
                          tooltip={item.title}
                        >
                          <a href={item.path}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  A
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">System Administrator</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
