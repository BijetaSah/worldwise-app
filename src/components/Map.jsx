import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";

function Map() {
  const [position, setPosition] = useState([
    38.727881642324164, -9.140900099907554,
  ]);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const navigate = useNavigate();
  const { cities } = useCities();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
