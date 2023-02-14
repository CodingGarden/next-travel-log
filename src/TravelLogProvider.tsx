'use client';

import { ReactNode, useReducer } from 'react';
import TravelLogContext from '@/TravelLogContext';
import {
  TravelLogState,
  TravelLogActionType,
  TravelLogActionTypes,
} from '@/types/TravelLogProviderTypes';
import TravelLogInitialState from '@/TravelLogInitialState';

interface AppProviderProps {
  children: ReactNode;
}

function TravelLogReducer(
  state: TravelLogState,
  action: TravelLogActionTypes
): TravelLogState {
  switch (action.type) {
    case TravelLogActionType.SET_CURRENT_MARKER_LOCATION: {
      return {
        ...state,
        currentMarkerLocation: action.data,
      };
    }
    case TravelLogActionType.SET_SIDEBAR_VISIBLE: {
      if (action.data === state.sidebarOpen) return state;
      return {
        ...state,
        sidebarOpen: action.data,
      };
    }
    case TravelLogActionType.SET_MAP: {
      return {
        ...state,
        map: action.data,
      };
    }
    default:
      return state;
  }
}

export default function TravelLogProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(TravelLogReducer, TravelLogInitialState);
  return (
    <TravelLogContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
}
