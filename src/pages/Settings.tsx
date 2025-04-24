
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Organization Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input type="text" placeholder="Trip Vista Travel LLC" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website URL</label>
            <Input type="text" placeholder="https://www.tripvista.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Email</label>
            <Input type="email" placeholder="contact@tripvista.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Phone</label>
            <Input type="tel" placeholder="+1 (555) 123-4567" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive email notifications for new bookings and status updates</p>
            </div>
            <div className="flex items-center h-6">
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">SMS Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent updates and payment confirmations</p>
            </div>
            <div className="flex items-center h-6">
              <input type="checkbox" className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Browser Notifications</h3>
              <p className="text-sm text-muted-foreground">Show desktop notifications while using the application</p>
            </div>
            <div className="flex items-center h-6">
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
            </div>
            <div className="flex items-center h-6">
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Session Timeout</h3>
              <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
            </div>
            <select className="h-9 px-4 rounded-md border border-input bg-background text-sm">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
