import React from 'react';
import { DashboardLayout } from '../../components/Layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { usePinterestAccounts } from '../../hooks/usePinterestAccounts';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PINTEREST_CLIENT_ID = import.meta.env.VITE_PINTEREST_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/dashboard/accounts`;
const PINTEREST_SCOPES = ['boards:read', 'pins:read', 'pins:write'].join(',');

const Accounts = () => {
  const { accounts, isLoading, disconnectAccount } = usePinterestAccounts();

  const handleConnect = () => {
    const authUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${PINTEREST_SCOPES}`;
    window.location.href = authUrl;
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      await disconnectAccount(accountId);
      toast.success('Account disconnected successfully');
    } catch (error) {
      toast.error('Failed to disconnect account');
    }
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Pinterest Accounts</h1>
          <Button onClick={handleConnect}>
            Connect Pinterest Account
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No Pinterest accounts connected yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Connect your Pinterest account to start scheduling pins.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={account.profileImage}
                    alt={account.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {account.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {account.boards.length} boards
                    </p>
                  </div>
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Accounts;