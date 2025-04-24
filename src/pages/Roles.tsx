
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
import { Button } from '@/components/ui/button';
import { Plus, Edit, Activity } from 'lucide-react';

export const Roles: React.FC = () => {
  const roles = [
    { id: 1, name: 'Admin', description: 'Full system access', usersCount: 3, lastUpdated: '2025-04-15' },
    { id: 2, name: 'Finance', description: 'Access to financial data and transactions', usersCount: 5, lastUpdated: '2025-04-12' },
    { id: 3, name: 'Support Agent', description: 'Customer support and booking management', usersCount: 8, lastUpdated: '2025-04-20' },
    { id: 4, name: 'Agent Manager', description: 'Manage travel agents and their bookings', usersCount: 4, lastUpdated: '2025-04-10' },
    { id: 5, name: 'Read Only', description: 'View-only access to system data', usersCount: 6, lastUpdated: '2025-04-05' },
  ];

  const permissionAreas = [
    { name: 'Dashboard', permissions: ['View'] },
    { name: 'Agents', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { name: 'Passengers', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { name: 'Bookings', permissions: ['View', 'Create', 'Edit', 'Cancel'] },
    { name: 'Payments', permissions: ['View', 'Process', 'Refund'] },
    { name: 'Users', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { name: 'Roles', permissions: ['View', 'Create', 'Edit', 'Delete'] },
    { name: 'Settings', permissions: ['View', 'Edit'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Roles & Permissions</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Audit Log
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Roles</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.usersCount}</TableCell>
                <TableCell>{role.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Permissions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Permission Matrix</h2>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                {permissionAreas[0].permissions.map(permission => (
                  <TableHead key={permission}>{permission}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionAreas.map((area) => (
                <TableRow key={area.name}>
                  <TableCell className="font-medium">{area.name}</TableCell>
                  {area.permissions.map(permission => (
                    <TableCell key={`${area.name}-${permission}`}>
                      <div className="flex justify-center">
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
