import L, { latLng } from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import "./Destination.css";
import { isPointInCircle } from "../utils/circle";
import { Card, Text, Button, Flex } from "@mantine/core";
import Lottie from "react-lottie";
import walk from "../assets/walk.json";
import walk2 from "../assets/walk2.json";

const currentLocation = L.divIcon({ className: "beacon" });

const LocationMarker = ({ centerLat, centerLng, radius, onEnterCircle }) => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      const timerId = setInterval(() => {
        setPosition(e.latlng);
        // TODO: 当たり判定のロジック追加
        const result = isPointInCircle(
          centerLat,
          centerLng,
          radius,
          e.latlng.lat,
          e.latlng.lng
        );

        if (result === true) {
          onEnterCircle();
        }
      }, 5000);

      return () => {
        clearInterval(timerId);
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return position === null ? null : (
    <Marker position={position} icon={currentLocation} />
  );
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const Destination = () => {
  const [touchCircleBoolean, setTouchCircleBoolean] = useState(false);
  const { productId, userName } = useParams();
  const navigate = useNavigate();
  const { data } = useSWR(`/api/products/${productId}`, fetcher);

  const position = latLng([35.17021108824347, 136.88519672572562]);
  const zoom = 12;
  return (
    <>
      <Flex>
        {[...Array(5).keys()].map((i) => (
          <Lottie
            key={i}
            options={{
              loop: true,
              autoplay: true,
              animationData: walk,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={60}
            width={40}
            isClickToPauseDisabled={true}
          />
        ))}
      </Flex>{" "}
      <Text size="xl">目的地へ向かう</Text>
      {data && (
        <>
          <MapContainer center={position} zoom={zoom}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              maxZoom={30}
              minZoom={5}
            />
            <LocationMarker
              centerLat={data.latitude}
              centerLng={data.longtitude}
              radius={50}
              onEnterCircle={() => setTouchCircleBoolean(true)}
            />
            <Circle
              center={latLng([data.latitude, data.longtitude])}
              radius={500}
            />
          </MapContainer>
          {touchCircleBoolean === false ? (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="md" td="underline">
                目的地へのヒント
              </Text>
              <Text size="md">{data.hint}</Text>
            </Card>
          ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text>おめでとうございます！！</Text>
              <Text>目的地に到着しました</Text>
              <Button
                variant="filled"
                onClick={() =>
                  navigate(
                    `/gest/products/${productId}/user/${userName}/question`,
                    {
                      replace: true,
                    }
                  )
                }
              >
                問題へ。
              </Button>
            </Card>
          )}
        </>
      )}
      <Flex>
        {[...Array(5).keys()].map((i) => (
          <Lottie
            key={i}
            options={{
              loop: true,
              autoplay: true,
              animationData: walk2,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            height={60}
            width={40}
            isClickToPauseDisabled={true}
          />
        ))}
      </Flex>{" "}
    </>
  );
};
