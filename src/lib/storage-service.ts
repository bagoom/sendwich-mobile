import AsyncStorage from '@react-native-async-storage/async-storage';

const AllowedStorageKeys = <const>[
  'jwt',
  'auth_provider',
  'access_token',
  'device_token',
];
const prefix = '__sendwich__';

let storage: MobileStorage | null = null;

export class MobileStorage {
  async getItem(key: typeof AllowedStorageKeys[number]) {
    const item = await AsyncStorage.getItem(`${prefix}${key}`);
    return item;
  }

  setItem(key: typeof AllowedStorageKeys[number], value: string) {
    AsyncStorage.setItem(`${prefix}${key}`, value);
  }
  removeItem(key: typeof AllowedStorageKeys[number]) {
    AsyncStorage.removeItem(`${prefix}${key}`);
  }
}

if (storage === null) {
  storage = new MobileStorage();
}

export default () => storage as MobileStorage;
