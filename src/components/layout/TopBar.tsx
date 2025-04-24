
import React from 'react';
import { Search, Bell } from 'lucide-react';
import { 
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const TopBar: React.FC = () => {
  const { state } = useSidebar();
  
  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <SidebarTrigger />
        
        <div className="relative ml-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            A
          </div>
          <div className="ml-2 hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@tripvista.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};
