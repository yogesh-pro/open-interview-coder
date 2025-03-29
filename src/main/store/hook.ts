import { useSyncExternalStore } from 'react';
import { SyncedStore } from './SyncedStore';

interface SyncedStoreOptions<T> {
  defaultValue: T;
  storageKey: string;
}

export const createSyncedStore = <T>({
  storageKey,
  defaultValue,
}: SyncedStoreOptions<T>) => {
  const store = new SyncedStore<T>(storageKey, defaultValue);
  return () => useSyncExternalStore(store.subscribe, store.getSnapshot);
};
