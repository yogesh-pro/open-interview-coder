/* eslint-disable no-underscore-dangle */

type View = 'queue' | 'solutions' | 'debug';

export class AppState {
  // eslint-disable-next-line no-use-before-define
  private static instance: AppState;

  private _isMainWindowVisible = false;

  private _view: View = 'queue';

  private _hasDebugged = false;

  private _problemInfo: any = null;

  // eslint-disable-next-line no-useless-constructor, no-empty-function
  private constructor() {}

  public static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  // Main Window Visibility
  isMainWindowVisible(): boolean {
    return this._isMainWindowVisible;
  }

  setMainWindowVisible(value: boolean): void {
    this._isMainWindowVisible = value;
  }

  // View
  getView(): View {
    return this._view;
  }

  setView(value: View): void {
    this._view = value;
  }

  // Debugged State
  getHasDebugged(): boolean {
    return this._hasDebugged;
  }

  setHasDebugged(value: boolean): void {
    this._hasDebugged = value;
  }

  // Problem Info
  getProblemInfo(): any {
    return this._problemInfo;
  }

  setProblemInfo(value: any): void {
    this._problemInfo = value;
  }
}
