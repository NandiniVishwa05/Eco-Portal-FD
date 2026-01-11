import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import HeatLayer from "../../../../components/maps/HeatLayer";

function ClickHandler({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            });
        }
    });
    return null;
}

export default function HeatMapMap({ points, onSelectLocation }) {
    return (
        <MapContainer
            center={[19.076, 72.8777]}
            zoom={11}
            style={{
                height: "100%",
                width: "100%",
                borderRadius: 8
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <HeatLayer points={points} />

            <ClickHandler onSelect={onSelectLocation} />
        </MapContainer>
    );
}
