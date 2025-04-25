
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface Agent {
  id: string;
  agentId: string;
  name: string;
  userId: string;
  username: string;
  settingsCount: number;
}

interface AgentMarkupDetailsProps {
  agent: Agent;
  onBack: () => void;
  onAddMarkup: () => void;
}

export const AgentMarkupDetails: React.FC<AgentMarkupDetailsProps> = ({
  agent,
  onBack,
  onAddMarkup
}) => {
  const agentDetails = {
    email: 'aldrin98@gmail.com',
    phone: '8667313484',
    commission: '50%',
    wallet: '₹5,4000',
    status: 'KYC requested'
  };

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4">
        ← Back
      </Button>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Agent Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{agent.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission Rate</p>
            <p className="font-medium">{agentDetails.commission}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium">{agent.userId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User Name</p>
            <p className="font-medium">{agent.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{agentDetails.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{agentDetails.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wallet Amount</p>
            <p className="font-medium">{agentDetails.wallet}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Onboarding Status</p>
            <p className="font-medium">{agentDetails.status}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Markup</h2>
          <Button onClick={onAddMarkup} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Markup
          </Button>
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="outline" className="rounded-full">Domestic flights</Button>
          <Button variant="default" className="rounded-full bg-red-500 hover:bg-red-600">International Flights</Button>
        </div>

        {/* Markup list will go here */}
      </div>
    </div>
  );
};
