// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import type { IpcRendererEvent } from 'electron';
import { contextBridge, ipcRenderer, shell } from 'electron';
import { PROCESSING_EVENTS } from './constant';

const electronHandler = {
  store: {
    get(key: string) {
      return ipcRenderer.sendSync('get-store', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('set-store', property, val);
    },
    subscribe(key: string, func: (...args: any[]) => void) {
      ipcRenderer.send('subscribe-store', key);
      const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
        func(...args);
      const channelName = `onChange:${key}`;
      ipcRenderer.on(channelName, subscription);

      return () => {
        ipcRenderer.removeListener(channelName, subscription);
      };
    },
    unsubscribe(key: string) {
      ipcRenderer.send('unsubscribe-store', key);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

const electronAPI = {
  updateContentDimensions: (dimensions: { width: number; height: number }) =>
    ipcRenderer.invoke('update-content-dimensions', dimensions),
  takeScreenshot: () => ipcRenderer.invoke('take-screenshot'),
  getScreenshots: () => ipcRenderer.invoke('get-screenshots'),
  deleteScreenshot: (path: string) =>
    ipcRenderer.invoke('delete-screenshot', path),

  // Event listeners
  onScreenshotTaken: (
    callback: (data: { path: string; preview: string }) => void,
  ) => {
    const subscription = (_: any, data: { path: string; preview: string }) =>
      callback(data);
    ipcRenderer.on('screenshot-taken', subscription);
    return () => {
      ipcRenderer.removeListener('screenshot-taken', subscription);
    };
  },
  onSolutionsReady: (callback: (solutions: string) => void) => {
    const subscription = (_: any, solutions: string) => callback(solutions);
    ipcRenderer.on('solutions-ready', subscription);
    return () => {
      ipcRenderer.removeListener('solutions-ready', subscription);
    };
  },
  onResetView: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on('reset-view', subscription);
    return () => {
      ipcRenderer.removeListener('reset-view', subscription);
    };
  },
  onSolutionStart: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on(PROCESSING_EVENTS.INITIAL_START, subscription);
    return () => {
      ipcRenderer.removeListener(PROCESSING_EVENTS.INITIAL_START, subscription);
    };
  },
  onDebugStart: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on(PROCESSING_EVENTS.DEBUG_START, subscription);
    return () => {
      ipcRenderer.removeListener(PROCESSING_EVENTS.DEBUG_START, subscription);
    };
  },
  onDebugSuccess: (callback: (data: any) => void) => {
    ipcRenderer.on('debug-success', (_event, data) => callback(data));
    return () => {
      ipcRenderer.removeListener('debug-success', (_event, data) =>
        callback(data),
      );
    };
  },
  onDebugError: (callback: (error: string) => void) => {
    const subscription = (_: any, error: string) => callback(error);
    ipcRenderer.on(PROCESSING_EVENTS.DEBUG_ERROR, subscription);
    return () => {
      ipcRenderer.removeListener(PROCESSING_EVENTS.DEBUG_ERROR, subscription);
    };
  },
  onSolutionError: (callback: (error: string) => void) => {
    const subscription = (_: any, error: string) => callback(error);
    ipcRenderer.on(PROCESSING_EVENTS.INITIAL_SOLUTION_ERROR, subscription);
    return () => {
      ipcRenderer.removeListener(
        PROCESSING_EVENTS.INITIAL_SOLUTION_ERROR,
        subscription,
      );
    };
  },
  onProcessingNoScreenshots: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on(PROCESSING_EVENTS.NO_SCREENSHOTS, subscription);
    return () => {
      ipcRenderer.removeListener(
        PROCESSING_EVENTS.NO_SCREENSHOTS,
        subscription,
      );
    };
  },
  onProblemExtracted: (callback: (data: any) => void) => {
    const subscription = (_: any, data: any) => callback(data);
    ipcRenderer.on(PROCESSING_EVENTS.PROBLEM_EXTRACTED, subscription);
    return () => {
      ipcRenderer.removeListener(
        PROCESSING_EVENTS.PROBLEM_EXTRACTED,
        subscription,
      );
    };
  },
  onSolutionSuccess: (callback: (data: any) => void) => {
    const subscription = (_: any, data: any) => callback(data);
    ipcRenderer.on(PROCESSING_EVENTS.SOLUTION_SUCCESS, subscription);
    return () => {
      ipcRenderer.removeListener(
        PROCESSING_EVENTS.SOLUTION_SUCCESS,
        subscription,
      );
    };
  },
  onUnauthorized: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on(PROCESSING_EVENTS.UNAUTHORIZED, subscription);
    return () => {
      ipcRenderer.removeListener(PROCESSING_EVENTS.UNAUTHORIZED, subscription);
    };
  },
  onApiKeyOutOfCredits: (callback: () => void) => {
    const subscription = () => callback();
    ipcRenderer.on(PROCESSING_EVENTS.API_KEY_OUT_OF_CREDITS, subscription);
    return () => {
      ipcRenderer.removeListener(
        PROCESSING_EVENTS.API_KEY_OUT_OF_CREDITS,
        subscription,
      );
    };
  },
  moveWindowLeft: () => ipcRenderer.invoke('move-window-left'),
  moveWindowRight: () => ipcRenderer.invoke('move-window-right'),
  toggleMainWindow: async () => {
    try {
      const result = await ipcRenderer.invoke('toggle-window');
      console.log('toggle-window result:', result);
      return result;
    } catch (error) {
      console.error('Error in toggleMainWindow:', error);
      throw error;
    }
  },
  updateApiKey: (apiKey: string) =>
    ipcRenderer.invoke('update-api-key', apiKey),
  setApiKey: (apiKey: string) => ipcRenderer.invoke('set-api-key', apiKey),
  openExternal: (url: string) => shell.openExternal(url),
  triggerScreenshot: () => ipcRenderer.invoke('trigger-screenshot'),
  triggerProcessScreenshots: () =>
    ipcRenderer.invoke('trigger-process-screenshots'),
  triggerReset: () => ipcRenderer.invoke('trigger-reset'),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);

export type ElectronAPI = typeof electronAPI;
