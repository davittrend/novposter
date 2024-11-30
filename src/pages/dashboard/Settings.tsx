import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../../components/Layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Settings as SettingsIcon, Bell, Clock, Shield } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    defaultPinsPerDay: 10,
    emailNotifications: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    autoPublish: false
  });

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        settings
      });
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <SettingsIcon className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* Scheduling Settings */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Scheduling</h2>
            </div>
            
            <div className="space-y-4">
              <Input
                type="number"
                label="Default pins per day"
                min={1}
                max={20}
                value={settings.defaultPinsPerDay}
                onChange={(e) => setSettings({
                  ...settings,
                  defaultPinsPerDay: parseInt(e.target.value, 10)
                })}
              />

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.autoPublish}
                    onChange={(e) => setSettings({
                      ...settings,
                      autoPublish: e.target.checked
                    })}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">
                    Automatically publish pins at scheduled time
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      emailNotifications: e.target.checked
                    })}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">
                    Receive email notifications for pin status updates
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email Address</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <Button variant="outline" onClick={() => toast.error('Feature coming soon')}>
                  Change Email
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Password</h3>
                  <p className="text-sm text-gray-500">Last changed: Never</p>
                </div>
                <Button variant="outline" onClick={() => toast.error('Feature coming soon')}>
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;