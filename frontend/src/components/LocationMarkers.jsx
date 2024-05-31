/* eslint-disable no-unused-vars */
// LocationMarkers.tsx
import { useState } from "react";
import { latLng, icon } from "leaflet";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { useContext } from "react";
import { locationContext } from "../pages/ProblemDetail";

const ICON = icon({
  iconUrl: "/pin.jpeg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
});

export const LocationMarkers = () => {
  const [latlng, setLatlng] = useContext(locationContext);
  const [markers, setMarkers] = useState([]);
  // useMapEvent は `<MapContainer>` の内側からしか呼び出せない
  const map = useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    setLatlng([lat, lng]);
    setMarkers((markers) => [latLng(lat, lng)]);
    // setMarkers((markers) => [...markers, latLng(lat, lng)]);
  });

  return (
    <>
      {markers.map((marker) => (
        <Marker key={marker.toString()} position={marker} icon={ICON}>
          <Popup>{marker.toString()}</Popup>
        </Marker>
      ))}
    </>
  );
};
