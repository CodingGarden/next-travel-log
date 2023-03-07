'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { TravelLogEntryWithId } from '@/models/TravelLog/TravelLog';
import { useCallback, useContext, useLayoutEffect } from 'react';
import TravelLogContext from '@/TravelLogContext';
import {
  TravelLogActionType,
  TravelLogDispatch,
} from '@/types/TravelLogProviderTypes';
import clientConfig from '@/lib/clientConfig';

const createIcon = (fill = '#56BC58', iconSize = 32) => {
  return L.divIcon({
    className: 'bg-transparent',
    html: `<svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="${fill}" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="shadow-xl"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
  });
};

L.Marker.prototype.options.icon = createIcon();

const currentMarkerIcon = createIcon('#F2BB05', 40);

interface TravelLogMapProps {
  logs: TravelLogEntryWithId[];
}

interface InitMapProps {
  logs: TravelLogEntryWithId[];
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
        data: e.latlng.wrap(),
      });
      if (state.map) {
        const zoomLevel = state.map.getZoom();
        state.map.flyTo(e.latlng.wrap(), zoomLevel > 5 ? zoomLevel : 5);
      }
    },
    [state.map, dispatch]
  );
  return (
    <MapContainer
      worldCopyJump={true}
      className="w-full h-full"
      style={{ background: '#242525' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={clientConfig.NEXT_PUBLIC_MAP_TILE_URL || ''}
      />
      <InitMap logs={logs} dispatch={dispatch} onMapClick={onMapClick} />
      {state.currentMarkerLocation && (
        <Marker
          icon={currentMarkerIcon}
          eventHandlers={{
            dragend(e) {
              dispatch({
                type: TravelLogActionType.SET_CURRENT_MARKER_LOCATION,
                data: e.target.getLatLng().wrap(),
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
          <Popup offset={[0, -10]}>
            <p className="text-lg font-bold">{log.title}</p>
            <div className="flex justify-center items-center">
              <picture>
                <img alt={log.title} src={log.image} className="w-96" />
              </picture>
            </div>
            <p>{log.description}</p>
            <p className="text-sm italic">
              {new Date(log.visitDate).toLocaleDateString(undefined, {
                timeZone: 'UTC',
              })}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
