
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface MarkupTableProps {
  data: any[];
  onManage: (agent: any) => void;
}

export const MarkupTable: React.FC<MarkupTableProps> = ({ data, onManage }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const currentData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort('id')} className="cursor-pointer">
              Sl.No
            </TableHead>
            <TableHead onClick={() => requestSort('agentId')} className="cursor-pointer">
              Agent ID
            </TableHead>
            <TableHead onClick={() => requestSort('name')} className="cursor-pointer">
              Agent Name
            </TableHead>
            <TableHead onClick={() => requestSort('userId')} className="cursor-pointer">
              User ID
            </TableHead>
            <TableHead onClick={() => requestSort('username')} className="cursor-pointer">
              Username
            </TableHead>
            <TableHead onClick={() => requestSort('settingsCount')} className="cursor-pointer">
              No Of Settings
            </TableHead>
            <TableHead>View Markup</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.agentId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.settingsCount}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => onManage(item)}
                >
                  Manage
                </Button>
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
              className="cursor-pointer"
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
