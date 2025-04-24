
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AgentFiltersProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: string) => void;
  onLocationFilter: (location: string) => void;
}

export const AgentFilters: React.FC<AgentFiltersProps> = ({ 
  onSearch, 
  onStatusFilter, 
  onLocationFilter 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full h-10 pl-10 pr-4 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
        />
      </div>
      
      <div className="flex gap-4">
        <Select onValueChange={onStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Select onValueChange={onLocationFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="london">London</SelectItem>
              <SelectItem value="tokyo">Tokyo</SelectItem>
              <SelectItem value="sydney">Sydney</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
