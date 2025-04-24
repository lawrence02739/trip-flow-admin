
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
import { Search, UserPlus } from 'lucide-react';

export const Users: React.FC = () => {
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@tripvista.com', role: 'Admin', lastLogin: '2025-04-24 09:15 AM' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@tripvista.com', role: 'Support Agent', lastLogin: '2025-04-23 04:30 PM' },
    { id: 3, name: 'David Miller', email: 'david@tripvista.com', role: 'Finance', lastLogin: '2025-04-24 10:45 AM' },
    { id: 4, name: 'Emily Clark', email: 'emily@tripvista.com', role: 'Agent Manager', lastLogin: '2025-04-22 01:20 PM' },
    { id: 5, name: 'Robert Wilson', email: 'robert@tripvista.com', role: 'Support Agent', lastLogin: '2025-04-23 11:05 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="h-9 px-4 rounded-md border border-input bg-background text-sm">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance</option>
              <option value="support">Support Agent</option>
              <option value="agent">Agent Manager</option>
            </select>
            <Button variant="outline" size="sm">Bulk Actions</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : user.role === 'Finance'
                      ? 'bg-blue-100 text-blue-700'
                      : user.role === 'Agent Manager'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
