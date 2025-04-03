import { ipcMain } from 'electron';
import { MainWindowHelper } from './helper/MainWindowHelper';

const mainWindowHelper = MainWindowHelper.getInstance();

export function initializeIpcHandlers(): void {
  console.log('Initializing IPC handlers');

  // Window dimension handlers
  ipcMain.handle(
    'update-content-dimensions',
    async (event, { width, height }: { width: number; height: number }) => {
      if (width && height) {
        mainWindowHelper.setWindowDimensions(width, height);
      }
    },
  );

  ipcMain.handle('is-mac', () => {
    return process.platform === 'darwin';
  });
}
