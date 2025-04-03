import { contextBridge, ipcRenderer } from 'electron';
import type { AppState } from '../types';

const electronAPI = {
  getState: () => ipcRenderer.invoke('state:get') as Promise<AppState>,
  setState: (partialState: Partial<AppState>) =>
    ipcRenderer.send('state:update', partialState),
  onStateUpdate: (callback: (state: AppState) => void) => {
    const listener = (_: any, newState: AppState) => callback(newState);
    ipcRenderer.on('state:sync', listener);
    return () => ipcRenderer.removeListener('state:sync', listener);
  },
  updateContentDimensions: (dimensions: { width: number; height: number }) =>
    ipcRenderer.invoke('update-content-dimensions', dimensions),
  isMac: () => ipcRenderer.invoke('is-mac'),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
