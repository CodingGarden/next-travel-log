import { Dispatch } from 'react';

export interface TravelLogState {
  currentMarkerLocation: L.LatLng | null;
  sidebarOpen: boolean;
  map: L.Map | null;
}

export enum TravelLogActionType {
  SET_CURRENT_MARKER_LOCATION = 'SET_CURRENT_MARKER_LOCATION',
  SET_SIDEBAR_VISIBLE = 'SET_SIDEBAR_VISIBLE',
  SET_MAP = 'SET_MAP',
}

export interface TravelLogAction {
  type: TravelLogActionType;
  data: any;
}

export interface SetCurrentMarkerLocationAction extends TravelLogAction {
  type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION;
  data: L.LatLng | null;
}

export interface SetSidebarVisible extends TravelLogAction {
  type: TravelLogActionType.SET_SIDEBAR_VISIBLE;
  data: boolean;
}

export interface SetMap extends TravelLogAction {
  type: TravelLogActionType.SET_MAP;
  data: L.Map | null;
}

export type TravelLogActionTypes =
  | SetMap
  | SetCurrentMarkerLocationAction
  | SetSidebarVisible;

export type TravelLogDispatch = Dispatch<TravelLogActionTypes>;
