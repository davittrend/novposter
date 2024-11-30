import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../../components/Layout/DashboardLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { usePinterestAccounts } from '../../hooks/usePinterestAccounts';
import { parseCSV } from '../../lib/csvParser';
import { schedulePins } from '../../lib/scheduler';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, Upload } from 'lucide-react';

const SchedulePins = () => {
  const { user } = useAuth();
  const { accounts, isLoading: isLoadingAccounts } = usePinterestAccounts();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [pinsPerDay, setPinsPerDay] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user || !selectedAccount || !selectedBoard) {
      toast.error('Please select an account and board first');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const content = await file.text();
      const pins = parseCSV(content);
      
      if (pins.length === 0) {
        throw new Error('No valid pins found in CSV');
      }

      await schedulePins(
        pins,
        selectedBoard,
        selectedAccount,
        user.uid,
        pinsPerDay
      );

      toast.success(`Successfully scheduled ${pins.length} pins`);
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast.error('Failed to process CSV file');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedAccount, selectedBoard, pinsPerDay, user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);

  return (
    <DashboardLayout>
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Schedule Pins</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {/* Account Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pinterest Account
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                value={selectedAccount}
                onChange={(e) => {
                  setSelectedAccount(e.target.value);
                  setSelectedBoard('');
                }}
                disabled={isLoadingAccounts}
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Board Selection */}
            {selectedAccount && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pinterest Board
                </label>
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                >
                  <option value="">Select a board</option>
                  {selectedAccountData?.boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Pins Per Day */}
            <Input
              type="number"
              label="Pins per day"
              min={1}
              max={20}
              value={pinsPerDay}
              onChange={(e) => setPinsPerDay(parseInt(e.target.value, 10))}
            />

            {/* CSV Upload */}
            <div
              {...getRootProps()}
              className={`
                mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10
                ${isDragActive ? 'border-pink-500 bg-pink-50' : ''}
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <input {...getInputProps()} />
                  <p>
                    {isDragActive
                      ? 'Drop the CSV file here'
                      : isProcessing
                      ? 'Processing...'
                      : 'Drag and drop your CSV file here, or click to select'}
                  </p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  CSV with columns: title, description, link, imageUrl
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePins;