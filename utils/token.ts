import { Storage } from '@capacitor/storage';

export const setToken = async (token: string) => {
  await Storage.set({ key: 'access_token', value: token });
};

export const getToken = async () => {
  const res = await Storage.get({ key: 'access_token' });
  return res.value;
};

export const removeToken = async () => {
  await Storage.remove({ key: 'access_token' });
};
