import React, { createContext, useContext, useReducer } from 'react';
import { Activity } from '@artfair/common';

interface AppData {
  username: string;
  room: string;
  color: string;
  thickness: number;
  players: string[];
  isHost: boolean;
  activity: Activity;
  context: CanvasRenderingContext2D | null;
  avatarIndex: number;
}

const DEFAULT_APP_DATA: AppData = {
  username: '',
  room: '',
  color: '#1e272e',
  thickness: 10,
  players: [],
  isHost: false,
  activity: 'con-artist',
  context: null,
  avatarIndex: 0,
};

type AppAction =
  | { type: 'set-color'; color: string }
  | { type: 'set-thickness'; thickness: number }
  | { type: 'create-room'; username: string; room: string }
  | { type: 'join-room'; username: string; room: string; players: string[] }
  | { type: 'user-join'; username: string }
  | { type: 'user-leave'; username: string }
  | { type: 'set-activity'; activity: Activity }
  | { type: 'set-context'; context: CanvasRenderingContext2D }
  | { type: 'set-avatar-index'; index: number };

const AppReducer = (state: AppData, action: AppAction): AppData => {
  switch (action.type) {
    case 'set-color':
      return {
        ...state,
        color: action.color,
      };
    case 'set-thickness':
      return {
        ...state,
        thickness: action.thickness,
      };
    case 'create-room':
      return {
        ...state,
        username: action.username,
        room: action.room,
        isHost: true,
        players: [action.username],
      };
    case 'join-room':
      return {
        ...state,
        username: action.username,
        room: action.room,
        players: action.players,
        isHost: false,
      };
    case 'user-join':
      return {
        ...state,
        players: [...state.players, action.username],
      };
    case 'user-leave':
      return {
        ...state,
        players: state.players.filter((player) => player !== action.username),
      };
    case 'set-activity':
      return {
        ...state,
        activity: action.activity,
      };
    case 'set-context':
      return {
        ...state,
        context: action.context,
      };
    case 'set-avatar-index':
      return {
        ...state,
        avatarIndex: action.index,
      };
    default:
      throw new Error('Invalid action.');
  }
};

interface AppContextData {
  state: AppData;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextData | null>(null);

export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);
  if (context == null) throw new Error('App context has not been initialized.');
  return context;
};

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, DEFAULT_APP_DATA);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
