
import React, { useState, useEffect } from 'react';
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
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  agentId: string;
  name: string;
  userId: string;
  username: string;
  settingsCount: number;
}

interface MarkupType {
  id: string;
  name: string;
}

export const ManageMarkup = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAddMarkup, setShowAddMarkup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof Agent>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedMarkupTypes, setSelectedMarkupTypes] = useState<string[]>([]);

  const mockAgents: Agent[] = [
    { id: '01', agentId: '251425', name: 'Edwin Aldrin', userId: '121212', username: 'Felix antony', settingsCount: 3 },
    { id: '02', agentId: '352142', name: 'Aldrin Edward', userId: '521542', username: 'Antony felix', settingsCount: 2 },
    { id: '03', agentId: '451233', name: 'James Wilson', userId: '633421', username: 'Jwilson', settingsCount: 5 },
    { id: '04', agentId: '561234', name: 'Sarah Johnson', userId: '744532', username: 'Sjohnson', settingsCount: 1 },
    { id: '05', agentId: '671235', name: 'Michael Brown', userId: '855643', username: 'Mbrown', settingsCount: 4 },
    { id: '06', agentId: '781236', name: 'Emily Davis', userId: '966754', username: 'Edavis', settingsCount: 3 },
    { id: '07', agentId: '891237', name: 'Robert Miller', userId: '077865', username: 'Rmiller', settingsCount: 2 },
    { id: '08', agentId: '901238', name: 'Jennifer Garcia', userId: '188976', username: 'Jgarcia', settingsCount: 0 },
  ];

  const markupTypes: MarkupType[] = [
    { id: '1', name: 'Air' },
    { id: '2', name: 'Hotel' },
    { id: '3', name: 'Car' },
    { id: '4', name: 'Package' },
    { id: '5', name: 'International' },
    { id: '6', name: 'Domestic' },
  ];

  // Filter agents based on search query and markup types
  const filteredAgents = mockAgents.filter(agent => 
    (agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.agentId.includes(searchQuery) ||
    agent.userId.includes(searchQuery))
  );

  // Sort the filtered agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = sortedAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage);

  // Handle sorting
  const handleSort = (column: keyof Agent) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Toggle markup type filter
  const toggleMarkupType = (typeId: string) => {
    setSelectedMarkupTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  // Sort indicator component
  const SortIndicator = ({ column }: { column: keyof Agent }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };

  // Pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMarkupTypes]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Markup Management</h1>

      {!selectedAgent ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {markupTypes.map(type => (
                <Badge
                  key={type.id}
                  variant={selectedMarkupTypes.includes(type.id) ? "default" : "outline"}
                  className="cursor-pointer flex items-center gap-1 px-3 py-1"
                  onClick={() => toggleMarkupType(type.id)}
                >
                  {type.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('agentId')}
                  >
                    <div className="flex items-center">
                      Agent ID
                      <SortIndicator column="agentId" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      <SortIndicator column="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('username')}
                  >
                    <div className="flex items-center">
                      Username
                      <SortIndicator column="username" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('settingsCount')}
                  >
                    <div className="flex items-center">
                      Markup Settings
                      <SortIndicator column="settingsCount" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.agentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.settingsCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAgent(agent)}
                      >
                        Manage Markup
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredAgents.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredAgents.length)} of {filteredAgents.length} agents
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
            <div>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>
        </>
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
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="package">Package</SelectItem>
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
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input type="number" placeholder="0.00" />
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
