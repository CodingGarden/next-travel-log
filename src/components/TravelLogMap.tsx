'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import type { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { useCallback, useContext, useLayoutEffect } from 'react';
import TravelLogContext from '@/TravelLogContext';
import {
  TravelLogActionType,
  TravelLogDispatch,
} from '@/types/TravelLogProviderTypes';

if (!process.env.NEXT_PUBLIC_MAP_TILE_URL) {
  throw new Error('Missing NEXT_PUBLIC_MAP_TILE_URL in .env.local');
}

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TravelLogMapProps {
  logs: TravelLogWithId[];
}

interface InitMapProps {
  logs: TravelLogWithId[];
  onMapClick: (event: L.LeafletMouseEvent) => void;
  dispatch: TravelLogDispatch;
}

const InitMap = ({ logs, onMapClick, dispatch }: InitMapProps) => {
  const map = useMap();
  useLayoutEffect(() => {
    setTimeout(() => {
      dispatch({
        type: TravelLogActionType.SET_MAP,
        data: map,
      });
      map.invalidateSize();
      if (logs.length) {
        const bounds = new L.LatLngBounds(
          logs.map((log) => [log.latitude, log.longitude])
        );
        map.fitBounds(bounds);
      } else {
        map.setZoom(3);
        map.setView([34.85480922648911, -41.89881501280613]);
      }
      map.on('click', onMapClick);
      // TODO: less hacky way...
    }, 200);
  }, [map, logs, onMapClick, dispatch]);
  return null;
};

export default function TravelLogMap({ logs }: TravelLogMapProps) {
  const { state, dispatch } = useContext(TravelLogContext);
  const onMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      dispatch({
        type: TravelLogActionType.SET_SIDEBAR_VISIBLE,
        data: true,
      });
      dispatch({
        type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
        data: e.latlng,
      });
      if (state.map) {
        const zoomLevel = state.map.getZoom();
        state.map.flyTo(e.latlng, zoomLevel > 5 ? zoomLevel : 5);
      }
    },
    [state.map, dispatch]
  );
  return (
    <MapContainer className="w-full h-full" style={{ background: '#242525' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.NEXT_PUBLIC_MAP_TILE_URL || ''}
      />
      <InitMap logs={logs} dispatch={dispatch} onMapClick={onMapClick} />
      {state.currentMarkerLocation && (
        <Marker
          eventHandlers={{
            dragend(e) {
              dispatch({
                type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
                data: e.target.getLatLng(),
              });
            },
          }}
          draggable
          position={state.currentMarkerLocation}
        ></Marker>
      )}
      {logs.map((log) => (
        <Marker
          key={log._id.toString()}
          position={[log.latitude, log.longitude]}
        >
          <Popup offset={[0, -32]}>
            <p className="text-lg font-bold">{log.title}</p>
            <div className="flex justify-center items-center">
              <img alt={log.title} src={log.image} className="w-96" />
            </div>
            <p>{log.description}</p>
            <p className="text-sm italic">
              {new Date(log.visitDate.toString()).toLocaleDateString()}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
