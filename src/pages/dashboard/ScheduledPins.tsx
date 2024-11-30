import React, { useState } from 'react';
import { format } from 'date-fns';
import { DashboardLayout } from '../../components/Layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { usePinterestAccounts } from '../../hooks/usePinterestAccounts';
import { useScheduledPins } from '../../hooks/useScheduledPins';
import { Loader2, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ScheduledPins = () => {
  const { accounts } = usePinterestAccounts();
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const { pins, isLoading, deletePin, publishPin } = useScheduledPins(selectedAccount);

  const handleDelete = async (pinId: string) => {
    try {
      await deletePin(pinId);
      toast.success('Pin deleted successfully');
    } catch (error) {
      toast.error('Failed to delete pin');
    }
  };

  const handlePublish = async (pin: any) => {
    try {
      await publishPin(pin);
      toast.success('Pin published successfully');
    } catch (error) {
      toast.error('Failed to publish pin');
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Scheduled Pins</h1>
          
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.username}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
          </div>
        ) : pins.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No scheduled pins found.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pin Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pins.map((pin) => {
                  const account = accounts.find(acc => acc.id === pin.accountId);
                  const board = account?.boards.find(b => b.id === pin.boardId);

                  return (
                    <tr key={pin.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={pin.imageUrl}
                            alt={pin.title}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pin.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {account?.username} / {board?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(pin.scheduledTime!, 'PPp')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${pin.status === 'published' ? 'bg-green-100 text-green-800' : ''}
                          ${pin.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${pin.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {pin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {pin.status === 'scheduled' && (
                            <Button
                              onClick={() => handlePublish(pin)}
                              variant="secondary"
                              className="px-2 py-1"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="ml-1">Publish Now</span>
                            </Button>
                          )}
                          <button
                            onClick={() => handleDelete(pin.id!)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ScheduledPins;