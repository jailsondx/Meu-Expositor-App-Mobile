import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToken(token: string) {
  await AsyncStorage.setItem('@token', token);
}

export async function getToken() {
  return AsyncStorage.getItem('@token');
}

export async function removeToken() {
  await AsyncStorage.removeItem('@token');
}

export async function setUser(name: string) {
  await AsyncStorage.setItem('@user', name);
}

export async function getUser() {
  return AsyncStorage.getItem('@user');
}

export async function removeUser() {
  await AsyncStorage.removeItem('@user');
}
