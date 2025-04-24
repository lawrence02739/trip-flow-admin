
import React from 'react';
import { Users, Calendar, CreditCard, DollarSign } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookingTrend } from '@/components/dashboard/BookingTrend';
import { RevenueByService } from '@/components/dashboard/RevenueByService';
import { Button } from '@/components/ui/button';

export const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Create Booking</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Bookings" 
          value="1,285" 
          icon={<Calendar className="h-5 w-5" />} 
          change={{ value: 12.5, trend: 'up' }}
        />
        <StatCard 
          title="Total Revenue" 
          value="$45,231" 
          icon={<DollarSign className="h-5 w-5" />} 
          change={{ value: 8.2, trend: 'up' }}
        />
        <StatCard 
          title="Active Agents" 
          value="48" 
          icon={<Users className="h-5 w-5" />} 
          change={{ value: 4.1, trend: 'up' }}
        />
        <StatCard 
          title="Pending Payments" 
          value="$12,580" 
          icon={<CreditCard className="h-5 w-5" />} 
          change={{ value: 2.3, trend: 'down' }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <BookingTrend />
        <RevenueByService />
      </div>
    </div>
  );
};
