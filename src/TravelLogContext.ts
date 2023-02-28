'use client';

import { createContext } from 'react';
import {
  TravelLogState,
  TravelLogDispatch,
} from '@/types/TravelLogProviderTypes';
import TravelLogInitialState from '@/TravelLogInitialState';

interface TravelLogContext {
  state: TravelLogState;
  dispatch: TravelLogDispatch;
}

export default createContext<TravelLogContext>({
  state: TravelLogInitialState,
  dispatch: () => {},
});
