
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentMarkupDetails } from '@/components/markup/AgentMarkupDetails';

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

  const mockAgents: Agent[] = [
    { id: '01', agentId: '251425', name: 'Edwin Aldrin', userId: '121212', username: 'Felix antony', settingsCount: 3 },
    { id: '02', agentId: '352142', name: 'Aldrin Edward', userId: '521542', username: 'Antony felix', settingsCount: 2 },
    // ... add more mock data as needed
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search..."
          className="max-w-sm"
        />
      </div>

      {!selectedAgent ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl.No</TableHead>
              <TableHead>Agent ID</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>No Of Settings</TableHead>
              <TableHead>View Markup</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAgents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.id}</TableCell>
                <TableCell>{agent.agentId}</TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.userId}</TableCell>
                <TableCell>{agent.username}</TableCell>
                <TableCell>{agent.settingsCount}</TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
