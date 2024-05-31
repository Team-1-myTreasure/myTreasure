/* eslint-disable no-unused-vars */
import { latLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useState } from "react";

const LocationMarker = ({ onChangeMarker }) => {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click: (location) => {
      setPosition([location.latlng.lat, location.latlng.lng]);
      onChangeMarker([location.latlng.lat, location.latlng.lng]);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

export const Map = ({ onChangeMarker }) => {
  const position = latLng([35.17021108824347, 136.88519672572562]);
  const zoom = 12;

  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={30}
        minZoom={5}
      />
      <LocationMarker onChangeMarker={onChangeMarker} />
    </MapContainer>
  );
};
