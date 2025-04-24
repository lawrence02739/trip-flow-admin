
import React from 'react';
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
import { Search, Filter, Download, Calendar } from 'lucide-react';

export const Payments: React.FC = () => {
  const transactions = [
    { id: 'TX-001', date: '2025-04-23', amount: 1250.00, method: 'Credit Card', status: 'Success', payer: 'John Doe' },
    { id: 'TX-002', date: '2025-04-22', amount: 780.50, method: 'PayPal', status: 'Success', payer: 'Jane Smith' },
    { id: 'TX-003', date: '2025-04-22', amount: 325.75, method: 'Debit Card', status: 'Failed', payer: 'Bob Johnson' },
    { id: 'TX-004', date: '2025-04-21', amount: 1800.00, method: 'Bank Transfer', status: 'Pending', payer: 'Alice Brown' },
    { id: 'TX-005', date: '2025-04-20', amount: 450.25, method: 'Credit Card', status: 'Success', payer: 'Michael Wilson' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payments & Transactions</h1>
        <Button variant="outline">
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

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <select className="h-9 px-4 rounded-md border border-input bg-background text-sm">
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payer</TableHead>
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
  );
};
