jest.mock('axios');
import axios from 'axios';
import { getUserProfile } from '../../services/facebookService';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Facebook Service', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const userProfile = { name: 'Saneera Silva', id: '7073187962785692' };
      mockedAxios.get.mockResolvedValueOnce({ data: userProfile });
      const profile = await getUserProfile('7073187962785692');
      expect(profile).toEqual(userProfile);
    });

    it('should throw error if failed to fetch user profile', async () => {
      const error = new Error('Failed to fetch user profile');
      mockedAxios.get.mockRejectedValueOnce(error);
      await expect(getUserProfile('1234')).rejects.toThrow('Failed to fetch user profile');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching user profile:', error);
    });
  });
});
