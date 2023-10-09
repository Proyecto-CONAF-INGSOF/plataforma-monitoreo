import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

function ChileMap() {
  return (
    <div style={{ height: '500px', width: '100%', marginTop: '15px', zIndex: 0 }}>
      <MapContainer
        center={[-33.5, -70.6]}
        zoom={6}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          url='https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
          maxZoom={20}
          subdomains={['mt1', 'mt2', 'mt3']}
        />
      </MapContainer>
    </div>
  );
}

export default ChileMap;
