
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';

export const Passengers: React.FC = () => {
  const passengers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', loyalty: 'Gold', lastBooking: '2025-04-12' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8902', loyalty: 'Silver', lastBooking: '2025-04-08' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234-567-8903', loyalty: 'Gold', lastBooking: '2025-03-29' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234-567-8904', loyalty: 'Standard', lastBooking: '2025-03-15' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+1 234-567-8905', loyalty: 'Silver', lastBooking: '2025-04-02' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Passenger Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Passenger
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search passengers..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <select className="h-9 px-4 rounded-md border border-input bg-background text-sm">
              <option value="all">All Tiers</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="standard">Standard</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Loyalty Tier</TableHead>
              <TableHead>Last Booking</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow key={passenger.id}>
                <TableCell className="font-medium">{passenger.name}</TableCell>
                <TableCell>
                  <div>{passenger.email}</div>
                  <div className="text-sm text-muted-foreground">{passenger.phone}</div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    passenger.loyalty === 'Gold' 
                      ? 'bg-[#FEF7CD] text-amber-700' 
                      : passenger.loyalty === 'Silver'
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {passenger.loyalty}
                  </span>
                </TableCell>
                <TableCell>{passenger.lastBooking}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
