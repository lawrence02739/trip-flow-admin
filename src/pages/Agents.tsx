
import React, { useState } from 'react';
import { AgentFilters } from '@/components/agents/AgentFilters';
import { AgentsTable } from '@/components/agents/AgentsTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const sampleAgents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@tripvista.com',
    phone: '+1234567890',
    location: 'New York',
    status: 'active' as const,
    bookings: 45,
    revenue: 28500
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@tripvista.com',
    phone: '+1987654321',
    location: 'London',
    status: 'active' as const,
    bookings: 38,
    revenue: 24200
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@tripvista.com',
    phone: '+1122334455',
    location: 'Tokyo',
    status: 'inactive' as const,
    bookings: 12,
    revenue: 8500
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@tripvista.com',
    phone: '+1555666777',
    location: 'Sydney',
    status: 'active' as const,
    bookings: 32,
    revenue: 19800
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@tripvista.com',
    phone: '+1888999000',
    location: 'New York',
    status: 'active' as const,
    bookings: 28,
    revenue: 17500
  }
];

export const Agents: React.FC = () => {
  const [agents, setAgents] = useState(sampleAgents);
  const [filteredAgents, setFilteredAgents] = useState(sampleAgents);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => 
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.email.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredAgents(filtered);
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'all') {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => agent.status === status);
    setFilteredAgents(filtered);
  };

  const handleLocationFilter = (location: string) => {
    if (location === 'all') {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => 
      agent.location.toLowerCase().replace(' ', '-') === location
    );
    
    setFilteredAgents(filtered);
  };

  const handleViewAgent = (id: string) => {
    toast({
      title: "Agent Details",
      description: `Viewing details for agent ID: ${id}`,
    });
  };

  const handleEditAgent = (id: string) => {
    toast({
      title: "Edit Agent",
      description: `Editing agent ID: ${id}`,
    });
  };

  const handleDeleteAgent = (id: string) => {
    toast({
      title: "Delete Agent",
      description: `Deleting agent ID: ${id}`,
      variant: "destructive",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agent Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>
      
      <AgentFilters 
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onLocationFilter={handleLocationFilter}
      />
      
      <AgentsTable 
        agents={filteredAgents}
        onView={handleViewAgent}
        onEdit={handleEditAgent}
        onDelete={handleDeleteAgent}
      />
    </div>
  );
};
