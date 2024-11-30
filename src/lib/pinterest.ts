import axios from 'axios';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const PINTEREST_API_URL = 'https://api.pinterest.com/v5';

export interface PinterestAccount {
  id: string;
  username: string;
  profileImage: string;
  boards: PinterestBoard[];
  accessToken: string;
  tokenExpiry: number;
}

export interface PinterestBoard {
  id: string;
  name: string;
  description: string;
  privacy: string;
}

export const connectPinterestAccount = async (code: string, userId: string) => {
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://api.pinterest.com/v5/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: import.meta.env.VITE_PINTEREST_CLIENT_ID,
      client_secret: import.meta.env.VITE_PINTEREST_CLIENT_SECRET,
      redirect_uri: `${window.location.origin}/dashboard/accounts`
    });

    const { access_token, expires_in } = tokenResponse.data;
    
    // Get user info
    const userResponse = await axios.get(`${PINTEREST_API_URL}/user_account`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const account: PinterestAccount = {
      id: userResponse.data.id,
      username: userResponse.data.username,
      profileImage: userResponse.data.profile_image,
      boards: [],
      accessToken: access_token,
      tokenExpiry: Date.now() + (expires_in * 1000)
    };

    // Store account in Firestore
    await setDoc(doc(db, 'users', userId, 'pinterestAccounts', account.id), account);

    return account;
  } catch (error) {
    console.error('Error connecting Pinterest account:', error);
    throw error;
  }
};

export const fetchBoards = async (accessToken: string): Promise<PinterestBoard[]> => {
  try {
    const response = await axios.get(`${PINTEREST_API_URL}/boards`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data.items.map((board: any) => ({
      id: board.id,
      name: board.name,
      description: board.description,
      privacy: board.privacy
    }));
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const refreshPinterestToken = async (userId: string, accountId: string) => {
  try {
    const accountRef = doc(db, 'users', userId, 'pinterestAccounts', accountId);
    const accountDoc = await getDoc(accountRef);
    
    if (!accountDoc.exists()) {
      throw new Error('Account not found');
    }

    const account = accountDoc.data() as PinterestAccount;
    
    // Check if token needs refresh (27 days)
    if (Date.now() > account.tokenExpiry - (3 * 24 * 60 * 60 * 1000)) {
      const response = await axios.post('https://api.pinterest.com/v5/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: account.accessToken,
        client_id: import.meta.env.VITE_PINTEREST_CLIENT_ID,
        client_secret: import.meta.env.VITE_PINTEREST_CLIENT_SECRET
      });

      const { access_token, expires_in } = response.data;
      
      const updatedAccount = {
        ...account,
        accessToken: access_token,
        tokenExpiry: Date.now() + (expires_in * 1000)
      };

      await setDoc(accountRef, updatedAccount);
      return updatedAccount;
    }

    return account;
  } catch (error) {
    console.error('Error refreshing Pinterest token:', error);
    throw error;
  }
};