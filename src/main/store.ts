/* eslint-disable no-use-before-define */
// @ts-expect-error CommonJs
import Store from 'electron-store';

interface StoreSchema {
  apiKey: string;
}

const store = new Store<StoreSchema>({
  defaults: {
    apiKey: '',
  },
  encryptionKey: 'your-encryption-key',
}) as Store<StoreSchema> & {
  store: StoreSchema;
  get: <K extends keyof StoreSchema>(key: K) => StoreSchema[K];
  set: <K extends keyof StoreSchema>(key: K, value: StoreSchema[K]) => void;
};

export { store };
