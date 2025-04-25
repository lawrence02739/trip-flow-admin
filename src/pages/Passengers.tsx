
import React, { useState } from 'react';
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
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

export const Passengers: React.FC = () => {
  const initialPassengers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', loyalty: 'Gold', lastBooking: '2025-04-12' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8902', loyalty: 'Silver', lastBooking: '2025-04-08' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234-567-8903', loyalty: 'Gold', lastBooking: '2025-03-29' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234-567-8904', loyalty: 'Standard', lastBooking: '2025-03-15' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', phone: '+1 234-567-8905', loyalty: 'Silver', lastBooking: '2025-04-02' },
  ];

  const [passengers, setPassengers] = useState(initialPassengers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPassengers(query, filterTier);
  };

  // Handle filter by loyalty tier
  const handleTierFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tier = e.target.value;
    setFilterTier(tier);
    filterPassengers(searchQuery, tier);
  };

  // Combined filter function
  const filterPassengers = (query: string, tier: string) => {
    let filtered = initialPassengers;
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(passenger => 
        passenger.name.toLowerCase().includes(query) || 
        passenger.email.toLowerCase().includes(query)
      );
    }
    
    // Apply loyalty tier filter
    if (tier !== 'all') {
      filtered = filtered.filter(passenger => 
        passenger.loyalty.toLowerCase() === tier.toLowerCase()
      );
    }
    
    setPassengers(filtered);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
    
    const sorted = [...passengers].sort((a, b) => {
      // @ts-ignore - We know these fields exist on the passenger objects
      if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
      // @ts-ignore - We know these fields exist on the passenger objects
      if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setPassengers(sorted);
  };
  
  // Sort indicator component
  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Passenger Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search passengers..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <select 
              className="h-9 px-4 rounded-md border border-input bg-background text-sm"
              value={filterTier}
              onChange={handleTierFilter}
            >
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
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  <SortIndicator field="name" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Contact
                  <SortIndicator field="email" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('loyalty')}
              >
                <div className="flex items-center">
                  Loyalty Tier
                  <SortIndicator field="loyalty" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('lastBooking')}
              >
                <div className="flex items-center">
                  Last Booking
                  <SortIndicator field="lastBooking" />
                </div>
              </TableHead>
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
