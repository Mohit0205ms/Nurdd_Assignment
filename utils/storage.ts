import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = 'NURDD_TOKEN';
const POSTS_CACHE = 'NURDD_POSTS';
export const saveToken = (token: string) =>
  AsyncStorage.setItem(TOKEN_KEY, token);
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const removeToken = () => AsyncStorage.removeItem(TOKEN_KEY);

export const savePostsCache = async (posts: any) =>
  AsyncStorage.setItem(POSTS_CACHE, JSON.stringify(posts));
export const loadPostsCache = async () => {
  const s = await AsyncStorage.getItem(POSTS_CACHE);
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
};
