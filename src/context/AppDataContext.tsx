import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { RescueBatch, RescueStatus } from '../data/rescueBatches';
import { INITIAL_RESCUE_BATCHES } from '../data/rescueBatches';
import type { NGO, NGOMatchRecord } from '../data/ngos';
import { INITIAL_NGOS, INITIAL_MATCH_RECORDS } from '../data/ngos';

// Types
interface AppState {
  surplusBatches: RescueBatch[];
  ngos: NGO[];
  matchRecords: NGOMatchRecord[];
}

type Action =
  | { type: 'ADD_SURPLUS_BATCH'; payload: RescueBatch }
  | { type: 'UPDATE_SURPLUS_BATCH'; payload: RescueBatch }
  | { type: 'REMOVE_SURPLUS_BATCH'; payload: string }
  | { type: 'UPDATE_SURPLUS_STATUS'; payload: { id: string; status: RescueStatus } }
  | { type: 'ADD_MATCH_RECORD'; payload: NGOMatchRecord }
  | { type: 'UPDATE_MATCH_RECORD'; payload: NGOMatchRecord };

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_SURPLUS_BATCH':
      return { ...state, surplusBatches: [action.payload, ...state.surplusBatches] };
    case 'UPDATE_SURPLUS_BATCH':
      return { ...state, surplusBatches: state.surplusBatches.map(b => b.id === action.payload.id ? action.payload : b) };
    case 'REMOVE_SURPLUS_BATCH':
      return { ...state, surplusBatches: state.surplusBatches.filter(b => b.id !== action.payload) };
    case 'UPDATE_SURPLUS_STATUS':
      return { ...state, surplusBatches: state.surplusBatches.map(b => b.id === action.payload.id ? { ...b, status: action.payload.status } : b) };
    case 'ADD_MATCH_RECORD':
      return { ...state, matchRecords: [...state.matchRecords, action.payload] };
    case 'UPDATE_MATCH_RECORD':
      return { ...state, matchRecords: state.matchRecords.map(m => m.id === action.payload.id ? action.payload : m) };
    default:
      return state;
  }
};

const initialState: AppState = {
  surplusBatches: [...INITIAL_RESCUE_BATCHES],
  ngos: [...INITIAL_NGOS],
  matchRecords: [...INITIAL_MATCH_RECORDS],
};

const AppDataContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppDataContext.Provider value={{ state, dispatch }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
};
