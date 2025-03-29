import { ipcMain } from 'electron';
// @ts-expect-error CommonJS configuration
import Store from 'electron-store';
import { sendToAll } from '../util';

const store = new Store();
const subscriptions = new Map();

ipcMain.on('get-store', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('set-store', async (_, key, val) => {
  store.set(key, val);
});

ipcMain.on('subscribe-store', async (event, key) => {
  const unsubscribeFn = store.onDidChange(key, (newValue) => {
    sendToAll(`onChange:${key}`, newValue);
  });
  subscriptions.set(key, unsubscribeFn);
});

ipcMain.on('unsubscribe-store', async (event, key) => {
  subscriptions.get(key)();
  subscriptions.delete(key);
});
