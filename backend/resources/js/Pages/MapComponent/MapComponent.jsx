import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = () => {
    const position = [45.563, -73.5693]; //adresse

    const handleMarkerClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`;
        window.open(googleMapsUrl, "_blank");
    };

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "25vh", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
                position={position}
                draggable={false}
                eventHandlers={{ click: handleMarkerClick }}
            >
                <Popup>
                    4581 Sherbrooke St E <br /> Montreal, Quebec H1X 2B2 <br />{" "}
                    (514) 254-7131
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
