import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveRefreshToken(refreshToken: string): Promise<void> {
  try {
    await EncryptedStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving the user info', error);
  }
}

export async function loadRefreshToken(): Promise<string | null> {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (refreshToken) {
      return refreshToken;
    }
  } catch (error) {
    console.error('Error loading the tokens', error);
  }
  return null;
}

export async function removeRefreshToken() {
  await EncryptedStorage.removeItem('refreshToken');
}
