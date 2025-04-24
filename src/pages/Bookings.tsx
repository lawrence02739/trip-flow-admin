
import React, { useState } from 'react';
import { BookingFilters } from '@/components/bookings/BookingFilters';
import { BookingsTable } from '@/components/bookings/BookingsTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const sampleBookings = [
  {
    id: '1',
    reference: 'TV-2025-001',
    passengerName: 'Alice Cooper',
    destination: 'Paris, France',
    departureDate: new Date('2025-06-15'),
    returnDate: new Date('2025-06-25'),
    status: 'confirmed' as const,
    amount: 2450
  },
  {
    id: '2',
    reference: 'TV-2025-002',
    passengerName: 'Bob Marley',
    destination: 'Tokyo, Japan',
    departureDate: new Date('2025-07-10'),
    returnDate: new Date('2025-07-20'),
    status: 'pending' as const,
    amount: 3850
  },
  {
    id: '3',
    reference: 'TV-2025-003',
    passengerName: 'Charlie Brown',
    destination: 'New York, USA',
    departureDate: new Date('2025-08-05'),
    returnDate: new Date('2025-08-12'),
    status: 'cancelled' as const,
    amount: 1950
  },
  {
    id: '4',
    reference: 'TV-2025-004',
    passengerName: 'Diana Ross',
    destination: 'Rome, Italy',
    departureDate: new Date('2025-09-20'),
    returnDate: new Date('2025-09-28'),
    status: 'confirmed' as const,
    amount: 2850
  },
  {
    id: '5',
    reference: 'TV-2025-005',
    passengerName: 'Elton John',
    destination: 'Sydney, Australia',
    departureDate: new Date('2025-10-15'),
    returnDate: new Date('2025-10-30'),
    status: 'pending' as const,
    amount: 4250
  }
];

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState(sampleBookings);
  const [filteredBookings, setFilteredBookings] = useState(sampleBookings);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBookings(bookings);
      return;
    }
    
    const filtered = bookings.filter(booking => 
      booking.reference.toLowerCase().includes(query.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(query.toLowerCase()) ||
      booking.destination.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredBookings(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      setFilteredBookings(bookings);
      return;
    }
    
    const filtered = bookings.filter(booking => booking.status === status);
    setFilteredBookings(filtered);
  };

  const handleDateFilter = (date: Date | undefined) => {
    if (!date) {
      setFilteredBookings(bookings);
      return;
    }
    
    const filtered = bookings.filter(booking => {
      const departureDate = new Date(booking.departureDate);
      return (
        departureDate.getDate() === date.getDate() &&
        departureDate.getMonth() === date.getMonth() &&
        departureDate.getFullYear() === date.getFullYear()
      );
    });
    
    setFilteredBookings(filtered);
  };

  const handleViewBooking = (id: string) => {
    toast({
      title: "Booking Details",
      description: `Viewing details for booking ID: ${id}`,
    });
  };

  const handleEditBooking = (id: string) => {
    toast({
      title: "Edit Booking",
      description: `Editing booking ID: ${id}`,
    });
  };

  const handleCancelBooking = (id: string) => {
    toast({
      title: "Cancel Booking",
      description: `Cancelling booking ID: ${id}`,
      variant: "destructive",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Booking
        </Button>
      </div>
      
      <BookingFilters 
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onDateFilter={handleDateFilter}
      />
      
      <BookingsTable 
        bookings={filteredBookings}
        onView={handleViewBooking}
        onEdit={handleEditBooking}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};
