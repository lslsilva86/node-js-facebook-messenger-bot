import axios from 'axios';
import { PAGE_ACCESS_TOKEN } from '../config';

export const getUserProfile = async (psid: string): Promise<{ name: string }> => {
  try {
    const response = await axios.get(`https://graph.facebook.com/${psid}`, {
      params: {
        access_token: PAGE_ACCESS_TOKEN,
        fields: 'name',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};
