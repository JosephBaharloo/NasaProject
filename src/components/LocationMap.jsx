import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon with your theme colors
const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 42 16 42C16 42 32 24.837 32 16C32 7.163 24.837 0 16 0Z" 
                fill="url(#gradient)"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="42">
                    <stop offset="0%" stop-color="#9333ea"/>
                    <stop offset="100%" stop-color="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    `),
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42]
});

// Component to handle map clicks
function LocationSelector({ onLocationSelect }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
}

const LocationMap = ({ selectedPosition, onLocationSelect, center = [51.505, -0.09], zoom = 13 }) => {
    const [position, setPosition] = useState(selectedPosition || center);
    const mapRef = useRef(null);

    // USA bounds (approximate)
    const USA_BOUNDS = [
        [24.396308, -125.000000],  // Southwest coordinates (California coast)
        [49.384358, -66.934570]    // Northeast coordinates (Maine)
    ];

    useEffect(() => {
        if (selectedPosition) {
            setPosition(selectedPosition);
            if (mapRef.current) {
                mapRef.current.flyTo(selectedPosition, 13);
            }
        }
    }, [selectedPosition]);

    const handleLocationSelect = (latlng) => {
        const newPosition = [latlng.lat, latlng.lng];
        setPosition(newPosition);
        onLocationSelect(latlng.lat, latlng.lng);
    };

    return (
        <div className="w-full h-full rounded-2xl overflow-hidden" style={{ minHeight: '300px' }}>
            <MapContainer
                center={position}
                zoom={zoom}
                style={{ width: '100%', height: '100%', minHeight: '300px' }}
                ref={mapRef}
                maxBounds={USA_BOUNDS}
                maxBoundsViscosity={1.0}
                minZoom={4}
            >
                {/* Map Tiles - Using OpenStreetMap */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Alternative: Dark theme tiles for better integration */}
                {/* <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                /> */}

                {/* Click handler */}
                <LocationSelector onLocationSelect={handleLocationSelect} />

                {/* Marker */}
                {position && (
                    <Marker position={position} icon={customIcon} />
                )}
            </MapContainer>
        </div>
    );
};

export default LocationMap;
