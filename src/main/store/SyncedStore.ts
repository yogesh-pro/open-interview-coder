export class SyncedStore<T> {
  snapshot: T;

  defaultValue: T;

  storageKey: string;

  listeners: Set<Function> = new Set();

  constructor(storageKey: string, defaultValue: T = {} as T) {
    this.defaultValue = defaultValue;
    this.snapshot = window.electron.store.get(storageKey) ?? defaultValue;
    this.storageKey = storageKey;
  }

  getSnapshot = () => this.snapshot;

  onChange = (newValue: T) => {
    if (JSON.stringify(newValue) === JSON.stringify(this.snapshot)) return;
    this.snapshot = newValue ?? this.defaultValue;
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (callback: Function) => {
    this.listeners.add(callback);
    if (this.listeners.size === 1) {
      window.electron.store.subscribe(this.storageKey, this.onChange);
    }
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size !== 0) return;
      window.electron.store.unsubscribe(this.storageKey);
    };
  };
}
