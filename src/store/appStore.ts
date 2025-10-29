import { create } from 'zustand';

export type AppState =
  | 'idle'
  | 'listening'
  | 'awake'
  | 'processing'
  | 'result'
  | 'error';

interface AppStore {
  currentState: AppState;
  resultText: string;
  errorMessage: string | null;
  setState: (state: AppState) => void;
  setResult: (text: string) => void;
  setError: (msg: string) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentState: 'idle',
  resultText: '',
  errorMessage: null,

  setState: (state) => set({ currentState: state }),
  setResult: (text) =>
    set({
      resultText: text,
      currentState: 'result',
      errorMessage: null,
    }),
  setError: (msg) =>
    set({
      errorMessage: msg,
      currentState: 'error',
      resultText: '',
    }),
  reset: () =>
    set({
      currentState: 'idle',
      resultText: '',
      errorMessage: null,
    }),
}));
