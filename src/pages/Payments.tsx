
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
import { Search, Download, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'Success' | 'Failed' | 'Pending';
  payer: string;
}

export const Payments: React.FC = () => {
  const initialTransactions = [
    { id: 'TX-001', date: '2025-04-23', amount: 1250.00, method: 'Credit Card', status: 'Success' as const, payer: 'John Doe' },
    { id: 'TX-002', date: '2025-04-22', amount: 780.50, method: 'PayPal', status: 'Success' as const, payer: 'Jane Smith' },
    { id: 'TX-003', date: '2025-04-22', amount: 325.75, method: 'Debit Card', status: 'Failed' as const, payer: 'Bob Johnson' },
    { id: 'TX-004', date: '2025-04-21', amount: 1800.00, method: 'Bank Transfer', status: 'Pending' as const, payer: 'Alice Brown' },
    { id: 'TX-005', date: '2025-04-20', amount: 450.25, method: 'Credit Card', status: 'Success' as const, payer: 'Michael Wilson' },
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 2000]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [sortField, setSortField] = useState<keyof Transaction | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle search by transaction ID
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterTransactions(query, statusFilter, amountRange, dateRange);
  };

  // Handle status filter
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterTransactions(searchQuery, status, amountRange, dateRange);
  };

  // Handle amount range filter
  const handleAmountChange = (values: number[]) => {
    const range: [number, number] = [values[0], values[1]];
    setAmountRange(range);
    filterTransactions(searchQuery, statusFilter, range, dateRange);
  };

  // Handle date range filter
  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
    setShowDatePicker(false);
    filterTransactions(searchQuery, statusFilter, amountRange, range);
  };

  // Combined filter function
  const filterTransactions = (
    query: string, 
    status: string, 
    amountRange: [number, number], 
    dateRange: { from?: Date; to?: Date }
  ) => {
    let filtered = initialTransactions;
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(transaction => 
        transaction.id.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(transaction => 
        transaction.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    // Apply amount range filter
    filtered = filtered.filter(transaction => 
      transaction.amount >= amountRange[0] && transaction.amount <= amountRange[1]
    );
    
    // Apply date range filter
    if (dateRange.from) {
      filtered = filtered.filter(transaction => {
        const txDate = new Date(transaction.date);
        const fromDate = dateRange.from!;
        return txDate >= fromDate;
      });
    }
    
    if (dateRange.to) {
      filtered = filtered.filter(transaction => {
        const txDate = new Date(transaction.date);
        const toDate = dateRange.to!;
        return txDate <= toDate;
      });
    }
    
    setTransactions(filtered);
  };

  // Handle sorting
  const handleSort = (field: keyof Transaction) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    
    const sorted = [...transactions].sort((a, b) => {
      // Handle date sorting specially
      if (field === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // Handle other fields
      if (a[field] < b[field]) return sortDirection === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setTransactions(sorted);
  };

  // Export to CSV function
  const exportToCSV = () => {
    // Convert data to CSV
    const headers = ['Transaction ID', 'Date', 'Amount', 'Payment Method', 'Status', 'Payer'];
    const dataRows = transactions.map(tx => 
      [tx.id, tx.date, tx.amount.toFixed(2), tx.method, tx.status, tx.payer]
    );
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Sort indicator component
  const SortIndicator = ({ field }: { field: keyof Transaction }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments & Transactions</h1>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border border-border">
          <h3 className="text-lg font-medium mb-2">Daily Revenue</h3>
          <p className="text-3xl font-bold">$3,250.75</p>
          <p className="text-sm text-muted-foreground mt-1">+12% from yesterday</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-border">
          <h3 className="text-lg font-medium mb-2">Failed Transactions</h3>
          <p className="text-3xl font-bold">2.3%</p>
          <p className="text-sm text-muted-foreground mt-1">-0.5% from last week</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border border-border">
          <h3 className="text-lg font-medium mb-2">Top Payment Method</h3>
          <p className="text-3xl font-bold">Credit Card</p>
          <p className="text-sm text-muted-foreground mt-1">58% of transactions</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transaction ID..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from && dateRange.to ? 
                  `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}` :
                  "Date Range"
                }
              </Button>
              {showDatePicker && (
                <div className="absolute z-10 mt-2 right-0">
                  <DateRangePicker
                    date={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={handleDateChange}
                  />
                </div>
              )}
            </div>
            <select 
              className="h-9 px-4 rounded-md border border-input bg-background text-sm"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Amount Range: ${amountRange[0]} - ${amountRange[1]}
          </label>
          <Slider
            className="w-full max-w-md"
            defaultValue={[0, 2000]}
            min={0}
            max={2000}
            step={50}
            value={[amountRange[0], amountRange[1]]}
            onValueChange={handleAmountChange}
          />
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    Transaction ID
                    <SortIndicator field="id" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <SortIndicator field="date" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center">
                    Amount
                    <SortIndicator field="amount" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('method')}
                >
                  <div className="flex items-center">
                    Payment Method
                    <SortIndicator field="method" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    <SortIndicator field="status" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('payer')}
                >
                  <div className="flex items-center">
                    Payer
                    <SortIndicator field="payer" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.method}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Success' 
                        ? 'bg-green-100 text-green-700' 
                        : transaction.status === 'Failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.payer}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    {transaction.status === 'Success' && (
                      <Button variant="ghost" size="sm">Refund</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
