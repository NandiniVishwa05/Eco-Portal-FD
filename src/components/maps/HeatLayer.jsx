import { useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";

export default function HeatLayer({ points }) {
    const map = useMap();
    const heatRef = useRef(null);

    useEffect(() => {
        
        if (!map || !points?.length) return;

        // Remove old heat layer
        if (heatRef.current) {
            map.removeLayer(heatRef.current);
        }

        heatRef.current = L.heatLayer(points, {
            radius: 35,
            blur: 25,
            minOpacity: 0.6,     // 🔑 keeps heat visible when zoomed out
            maxZoom: 18,         // 🔑 VERY IMPORTANT
            gradient: {
                0.2: "#bff0d6",
                0.5: "#f39c12",
                0.8: "#c0392b"
            }
        }).addTo(map);


        return () => {
            if (heatRef.current) {
                map.removeLayer(heatRef.current);
            }
        };
    }, [map, points]);

    return null;
}
