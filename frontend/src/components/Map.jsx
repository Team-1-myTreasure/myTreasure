// Map.tsx
import { latLng } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
// leaflet のスタイルがないと地図が崩れる
import "leaflet/dist/leaflet.css";
// 地図を表示させるコンテナの height が必要
import "./map.css";
import { LocationMarkers } from "./LocationMarkers";

// 取得に成功した場合の処理

export const Map = () => {
  //   const initialLocation = [];
  const position = latLng([35.17021108824347, 136.88519672572562]);
  const zoom = 12;

  //   useEffect(() => {
  //     const successCallback = (position) => {
  //       // 緯度を取得し画面に表示
  //       initialLocation.push(position.coords.latitude);

  //       // 経度を取得し画面に表示
  //       initialLocation.push(position.coords.longitude);
  //     };
  //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  //     // 取得に失敗した場合の処理
  //     function errorCallback(error) {
  //       alert("位置情報が取得できませんでした");
  //     }
  //   }, []);
  return (
    <MapContainer center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        maxZoom={30}
        minZoom={5}
      />
      <LocationMarkers />
    </MapContainer>
  );
};
