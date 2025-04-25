
import React, { useState } from 'react';
import { AgentFilters } from '@/components/agents/AgentFilters';
import { AgentsTable } from '@/components/agents/AgentsTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced sample data with new fields
const sampleAgents = [
  {
    id: '1',
    userId: 'USR-001',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@tripvista.com',
    phone: '+1234567890',
    location: 'New York',
    status: 'active' as const,
    kycStatus: 'completed' as const,
    commissionRate: 15,
    bookings: 45,
    revenue: 28500
  },
  {
    id: '2',
    userId: 'USR-002',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane.smith@tripvista.com',
    phone: '+1987654321',
    location: 'London',
    status: 'active' as const,
    kycStatus: 'verified' as const,
    commissionRate: 12,
    bookings: 38,
    revenue: 24200
  },
  {
    id: '3',
    userId: 'USR-003',
    name: 'Robert Johnson',
    username: 'robertj',
    email: 'robert.johnson@tripvista.com',
    phone: '+1122334455',
    location: 'Tokyo',
    status: 'inactive' as const,
    kycStatus: 'requested' as const,
    commissionRate: 10,
    bookings: 12,
    revenue: 8500
  },
  {
    id: '4',
    userId: 'USR-004',
    name: 'Emily Davis',
    username: 'emilyd',
    email: 'emily.davis@tripvista.com',
    phone: '+1555666777',
    location: 'Sydney',
    status: 'active' as const,
    kycStatus: 'verified' as const,
    commissionRate: 18,
    bookings: 32,
    revenue: 19800
  },
  {
    id: '5',
    userId: 'USR-005',
    name: 'Michael Wilson',
    username: 'michaelw',
    email: 'michael.wilson@tripvista.com',
    phone: '+1888999000',
    location: 'New York',
    status: 'active' as const,
    kycStatus: 'completed' as const,
    commissionRate: 20,
    bookings: 28,
    revenue: 17500
  }
];

export const Agents: React.FC = () => {
  const [agents, setAgents] = useState(sampleAgents);
  const [filteredAgents, setFilteredAgents] = useState(sampleAgents);
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const { toast } = useToast();
  
  // Form state for new agent
  const [newAgent, setNewAgent] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: 'New York',
    commissionRate: 15,
    kycStatus: 'requested' as 'requested' | 'verified' | 'completed',
    status: 'active' as 'active' | 'inactive'
  });

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => 
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.email.toLowerCase().includes(query.toLowerCase()) ||
      agent.userId.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredAgents(filtered);
  };

  const handleStatusFilter = (statuses: string[]) => {
    if (!statuses.length) {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => statuses.includes(agent.status));
    setFilteredAgents(filtered);
  };

  const handleKycStatusFilter = (statuses: string[]) => {
    if (!statuses.length) {
      setFilteredAgents(agents);
      return;
    }
    
    const filtered = agents.filter(agent => statuses.includes(agent.kycStatus));
    setFilteredAgents(filtered);
  };

  const handleCommissionRateFilter = (range: [number, number]) => {
    const [min, max] = range;
    const filtered = agents.filter(agent => 
      agent.commissionRate >= min && agent.commissionRate <= max
    );
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

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new ID
    const newId = `${agents.length + 1}`;
    const userId = `USR-${String(agents.length + 1).padStart(3, '0')}`;
    
    // Create new agent object
    const agentToAdd = {
      id: newId,
      userId,
      ...newAgent,
      bookings: 0,
      revenue: 0
    };
    
    // Add to state
    const updatedAgents = [...agents, agentToAdd];
    setAgents(updatedAgents);
    setFilteredAgents(updatedAgents);
    
    // Show success notification
    toast({
      title: "New Agent Added",
      description: "The new agent has been successfully created.",
    });
    
    // Reset form and close modal
    setNewAgent({
      name: '',
      username: '',
      email: '',
      phone: '',
      location: 'New York',
      commissionRate: 15,
      kycStatus: 'requested',
      status: 'active'
    });
    setShowAddAgentModal(false);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewAgent(prev => ({
      ...prev,
      [id]: id === 'commissionRate' ? Number(value) : value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setNewAgent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agent Management</h1>
        <Dialog open={showAddAgentModal} onOpenChange={setShowAddAgentModal}>
          <DialogTrigger asChild>
            <Button variant="default" className="shadow-md hover:shadow-lg transition-shadow">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new travel agent account.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAgent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={newAgent.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    placeholder="johndoe" 
                    value={newAgent.username}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={newAgent.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1234567890" 
                    value={newAgent.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select 
                    value={newAgent.location}
                    onValueChange={(value) => handleSelectChange('location', value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="London">London</SelectItem>
                      <SelectItem value="Tokyo">Tokyo</SelectItem>
                      <SelectItem value="Sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input 
                    id="commissionRate"
                    type="number" 
                    min="0" 
                    max="100" 
                    value={newAgent.commissionRate}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kycStatus">KYC Status</Label>
                  <Select 
                    value={newAgent.kycStatus}
                    onValueChange={(value: 'requested' | 'verified' | 'completed') => 
                      handleSelectChange('kycStatus', value)
                    }
                  >
                    <SelectTrigger id="kycStatus">
                      <SelectValue placeholder="Select KYC status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="requested">Requested</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newAgent.status}
                    onValueChange={(value: 'active' | 'inactive') => 
                      handleSelectChange('status', value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button type="button" variant="outline" onClick={() => setShowAddAgentModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Agent
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <AgentFilters 
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onKycStatusFilter={handleKycStatusFilter}
        onCommissionRateFilter={handleCommissionRateFilter}
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
