import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -37.8136, // Melbourne latitude
  lng: 144.9631  // Melbourne longitude
};

const markerData = {
  position: center,
  title: 'Welcome to Melbourne!',
  image: 'https://en.wikipedia.org/wiki/Melbourne#/media/File:Flinders_Street_Station_Melbourne_March_2021.jpg'
};

function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  return (
    <div className="p-4">
      <h2>Map Page</h2>

      <LoadScript googleMapsApiKey="AIzaSyB4fl37yAX1fkS5sygBBkMDYOK2eHS-32M">
      

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker
            position={markerData.position}
            onClick={() => setSelectedMarker(markerData)}
          />

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ maxWidth: '200px' }}>
                <h6>{selectedMarker.title}</h6>
                <img
                  src={selectedMarker.image}
                  alt="Melbourne"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapPage;
