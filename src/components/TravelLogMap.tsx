'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import type { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { useEffect } from 'react';

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

const InitMap = ({ logs }: TravelLogMapProps) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const bounds = new L.LatLngBounds(
      logs.map((log) => [log.latitude, log.longitude])
    );
    map.fitBounds(bounds);
  }, [map, logs]);
  return null;
};

export default function TravelLogMap({ logs }: TravelLogMapProps) {
  return (
    <MapContainer className="w-full h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/codinggarden/cl84ukoao000p16o8u4zibr8d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY29kaW5nZ2FyZGVuIiwiYSI6ImNsODR1NThpajBmaGYzd29ldGk2aTI0YjUifQ.jLrb9oKppUiYkfLGCyYMhA"
      />
      <InitMap logs={logs} />
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
