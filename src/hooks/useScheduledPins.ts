import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { Pin } from '../lib/types';

export const useScheduledPins = (accountId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchPins = async (): Promise<Pin[]> => {
    if (!user) return [];
    
    const pinsRef = collection(db, 'users', user.uid, 'pins');
    const constraints = [where('userId', '==', user.uid)];
    
    if (accountId) {
      constraints.push(where('accountId', '==', accountId));
    }
    
    const q = query(pinsRef, ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Pin));
  };

  const deletePin = async (pinId: string) => {
    if (!user) throw new Error('No user logged in');
    await deleteDoc(doc(db, 'users', user.uid, 'pins', pinId));
  };

  const publishPin = async (pin: Pin) => {
    if (!user) throw new Error('No user logged in');
    if (!pin.id) throw new Error('Pin ID is required');
    
    // TODO: Implement actual Pinterest API pin creation
    await updateDoc(doc(db, 'users', user.uid, 'pins', pin.id), {
      status: 'published',
      publishedAt: Date.now()
    });
  };

  const { data: pins = [], isLoading, error } = useQuery({
    queryKey: ['scheduledPins', user?.uid, accountId],
    queryFn: fetchPins,
    enabled: !!user
  });

  const deleteMutation = useMutation({
    mutationFn: deletePin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledPins'] });
    }
  });

  const publishMutation = useMutation({
    mutationFn: publishPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduledPins'] });
    }
  });

  return {
    pins,
    isLoading,
    error,
    deletePin: deleteMutation.mutate,
    publishPin: publishMutation.mutate
  };
};