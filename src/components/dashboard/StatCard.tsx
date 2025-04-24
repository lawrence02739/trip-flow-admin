
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, className = '' }) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-bold">{value}</div>
        
        {change && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium flex items-center ${
              change.trend === 'up' ? 'text-travel-success' : 
              change.trend === 'down' ? 'text-travel-error' : 
              'text-muted-foreground'
            }`}>
              {change.trend === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
              {change.trend === 'down' && <ArrowDown className="h-3 w-3 mr-1" />}
              {change.value}% from last month
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
