
import React from 'react';
import { Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
  collapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar, collapsed }) => {
  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-muted text-foreground transition-colors mr-4"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-10 pl-10 pr-4 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="p-2 rounded-md hover:bg-muted text-foreground transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-travel-error rounded-full"></span>
        </button>
        
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-travel-blue flex items-center justify-center text-white">
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
