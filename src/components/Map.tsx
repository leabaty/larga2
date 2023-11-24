import React from 'react';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import { content } from '../contents/Map';

const customIcon = new Icon({
  iconUrl: content.icon,
  iconSize: [38, 38],
});

type Coordinates = [number, number];

const gpsMap: Coordinates = [content.gpsMap[0], content.gpsMap[1]];
const gpsPoi: Coordinates = [content.gpsPoi[0], content.gpsPoi[1]];

export default function Map() {
  return (
    <MapContainer center={gpsMap} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={gpsPoi} icon={customIcon}>
        <Popup>{content.poi}</Popup>
      </Marker>
    </MapContainer>
  );
}
