import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { PinterestAccount, refreshPinterestToken } from '../lib/pinterest';

export const usePinterestAccounts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchAccounts = async (): Promise<PinterestAccount[]> => {
    if (!user) return [];
    
    const accountsRef = collection(db, 'users', user.uid, 'pinterestAccounts');
    const snapshot = await getDocs(accountsRef);
    
    const accounts = snapshot.docs.map(doc => doc.data() as PinterestAccount);
    
    // Refresh tokens if needed
    const refreshedAccounts = await Promise.all(
      accounts.map(account => refreshPinterestToken(user.uid, account.id))
    );

    return refreshedAccounts;
  };

  const disconnectAccount = async (accountId: string) => {
    if (!user) throw new Error('No user logged in');
    await deleteDoc(doc(db, 'users', user.uid, 'pinterestAccounts', accountId));
  };

  const { data: accounts = [], isLoading, error } = useQuery({
    queryKey: ['pinterestAccounts', user?.uid],
    queryFn: fetchAccounts,
    enabled: !!user
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pinterestAccounts'] });
    }
  });

  return {
    accounts,
    isLoading,
    error,
    disconnectAccount: disconnectMutation.mutate
  };
};