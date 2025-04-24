
import React from 'react';
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
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface Booking {
  id: string;
  reference: string;
  passengerName: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
}

interface BookingsTableProps {
  bookings: Booking[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({ 
  bookings, 
  onView, 
  onEdit, 
  onCancel 
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-badge-success';
      case 'pending':
        return 'status-badge-warning';
      case 'cancelled':
        return 'status-badge-error';
      default:
        return 'status-badge-neutral';
    }
  };

  return (
    <div className="table-container">
      <Table>
        <TableCaption>A list of all bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Passenger</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => onView(booking.id)}>
              <TableCell className="font-medium">{booking.reference}</TableCell>
              <TableCell>{booking.passengerName}</TableCell>
              <TableCell>{booking.destination}</TableCell>
              <TableCell>{format(booking.departureDate, "MMM dd, yyyy")}</TableCell>
              <TableCell>{format(booking.returnDate, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <span className={getStatusBadgeClass(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>${booking.amount.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => { 
                      e.stopPropagation(); 
                      onView(booking.id); 
                    }}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onEdit(booking.id); 
                      }}
                      disabled={booking.status === 'cancelled'}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onCancel(booking.id); 
                      }}
                      className="text-destructive focus:text-destructive"
                      disabled={booking.status === 'cancelled'}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
