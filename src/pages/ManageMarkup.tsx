
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AgentMarkupDetails } from '@/components/markup/AgentMarkupDetails';
import { MarkupTable } from '@/components/markup/MarkupTable';

interface Agent {
  id: string;
  agentId: string;
  name: string;
  userId: string;
  username: string;
  settingsCount: number;
}

export const ManageMarkup = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAddMarkup, setShowAddMarkup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockAgents: Agent[] = [
    { id: '01', agentId: '251425', name: 'Edwin Aldrin', userId: '121212', username: 'Felix antony', settingsCount: 3 },
    { id: '02', agentId: '352142', name: 'Aldrin Edward', userId: '521542', username: 'Antony felix', settingsCount: 2 },
    // Add more mock data as needed
  ];

  const filteredAgents = mockAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.agentId.includes(searchQuery) ||
    agent.userId.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by name, username, agent ID, or user ID..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!selectedAgent ? (
        <MarkupTable 
          data={filteredAgents} 
          onManage={setSelectedAgent} 
        />
      ) : (
        <AgentMarkupDetails
          agent={selectedAgent}
          onBack={() => setSelectedAgent(null)}
          onAddMarkup={() => setShowAddMarkup(true)}
        />
      )}

      <Dialog open={showAddMarkup} onOpenChange={setShowAddMarkup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Markup</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Product Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Air" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Markup Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="International" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Amount Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Fixed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-4" onClick={() => setShowAddMarkup(false)}>
              Add Markup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMarkup;
