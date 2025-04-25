
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AgentFiltersProps {
  onSearch: (query: string) => void;
  onStatusFilter: (statuses: string[]) => void;
  onKycStatusFilter: (statuses: string[]) => void;
  onCommissionRateFilter: (range: [number, number]) => void;
  onLocationFilter: (location: string) => void;
}

export const AgentFilters: React.FC<AgentFiltersProps> = ({ 
  onSearch, 
  onStatusFilter,
  onKycStatusFilter,
  onCommissionRateFilter,
  onLocationFilter 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedKycStatuses, setSelectedKycStatuses] = useState<string[]>([]);
  const [commissionRange, setCommissionRange] = useState<[number, number]>([0, 100]);
  
  const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];
  
  const kycStatusOptions = [
    { label: 'Requested', value: 'requested' },
    { label: 'Verified', value: 'verified' },
    { label: 'Completed', value: 'completed' }
  ];

  const locationOptions = [
    { label: 'All Locations', value: 'all' },
    { label: 'New York', value: 'new-york' },
    { label: 'London', value: 'london' },
    { label: 'Tokyo', value: 'tokyo' },
    { label: 'Sydney', value: 'sydney' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleStatus = (status: string) => {
    let newSelectedStatuses;
    if (selectedStatuses.includes(status)) {
      newSelectedStatuses = selectedStatuses.filter(s => s !== status);
    } else {
      newSelectedStatuses = [...selectedStatuses, status];
    }
    setSelectedStatuses(newSelectedStatuses);
    onStatusFilter(newSelectedStatuses.length ? newSelectedStatuses : ['active', 'inactive']);
  };

  const toggleKycStatus = (status: string) => {
    let newSelectedStatuses;
    if (selectedKycStatuses.includes(status)) {
      newSelectedStatuses = selectedKycStatuses.filter(s => s !== status);
    } else {
      newSelectedStatuses = [...selectedKycStatuses, status];
    }
    setSelectedKycStatuses(newSelectedStatuses);
    onKycStatusFilter(newSelectedStatuses.length ? newSelectedStatuses : ['requested', 'verified', 'completed']);
  };

  const handleCommissionChange = (values: number[]) => {
    const range: [number, number] = [values[0], values[1]];
    setCommissionRange(range);
    onCommissionRateFilter(range);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search agents by name, email, or user ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="h-10 px-4 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            onChange={(e) => onLocationFilter(e.target.value)}
          >
            {locationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Agent Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(option => (
              <Button
                key={option.value}
                variant={selectedStatuses.includes(option.value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleStatus(option.value)}
                className="flex items-center gap-1"
              >
                {option.label}
                {selectedStatuses.includes(option.value) && (
                  <X className="h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">KYC Status</label>
          <div className="flex flex-wrap gap-2">
            {kycStatusOptions.map(option => (
              <Button
                key={option.value}
                variant={selectedKycStatuses.includes(option.value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleKycStatus(option.value)}
                className="flex items-center gap-1"
              >
                {option.label}
                {selectedKycStatuses.includes(option.value) && (
                  <X className="h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Commission Rate: {commissionRange[0]}% - {commissionRange[1]}%
          </label>
          <Slider
            defaultValue={[0, 100]}
            min={0}
            max={100}
            step={1}
            value={[commissionRange[0], commissionRange[1]]}
            onValueChange={handleCommissionChange}
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};
