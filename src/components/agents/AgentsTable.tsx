
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Agent {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  username: string;
  location: string;
  status: 'active' | 'inactive';
  kycStatus: 'requested' | 'verified' | 'completed';
  commissionRate: number;
  bookings: number;
  revenue: number;
}

interface AgentsTableProps {
  agents: Agent[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AgentsTable: React.FC<AgentsTableProps> = ({ 
  agents, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortColumn, setSortColumn] = useState<keyof Agent>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sort the agents based on the current sort column and direction
  const sortedAgents = [...agents].sort((a, b) => {
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
  const totalPages = Math.ceil(agents.length / itemsPerPage);

  // Handle sorting
  const handleSort = (column: keyof Agent) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === currentPage} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  // Sort indicator component
  const SortIndicator = ({ column }: { column: keyof Agent }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="table-container space-y-4">
      <div className="flex justify-end mb-4">
        <select 
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>

      <Table>
        <TableCaption>A list of all travel agents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('userId')}
            >
              <div className="flex items-center">
                UserID
                <SortIndicator column="userId" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Name
                <SortIndicator column="name" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('username')}
            >
              <div className="flex items-center">
                Username
                <SortIndicator column="username" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center">
                Email
                <SortIndicator column="email" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('phone')}
            >
              <div className="flex items-center">
                Phone
                <SortIndicator column="phone" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('commissionRate')}
            >
              <div className="flex items-center">
                Commission Rate
                <SortIndicator column="commissionRate" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('kycStatus')}
            >
              <div className="flex items-center">
                KYC Status
                <SortIndicator column="kycStatus" />
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status
                <SortIndicator column="status" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAgents.map((agent) => (
            <TableRow key={agent.id} className="hover:bg-muted/50">
              <TableCell>{agent.userId}</TableCell>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>{agent.username}</TableCell>
              <TableCell>{agent.email}</TableCell>
              <TableCell>{agent.phone}</TableCell>
              <TableCell>{agent.commissionRate}%</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  agent.kycStatus === 'completed' ? 'bg-green-100 text-green-700' : 
                  agent.kycStatus === 'verified' ? 'bg-blue-100 text-blue-700' : 
                  'bg-amber-100 text-amber-700'
                }`}>
                  {agent.kycStatus.charAt(0).toUpperCase() + agent.kycStatus.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <span className={agent.status === 'active' ? 'status-badge-success' : 'status-badge-error'}>
                  {agent.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onView(agent.id)}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(agent.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(agent.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {paginationItems}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
