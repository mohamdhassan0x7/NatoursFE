import React, { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = withGoogleMap(props => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Check if the Google Maps script has been loaded
    if (window.google) {
      setMap(<GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
      >
        {props.markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>);
    }
  }, [props.center, props.markers]);

  return map;
});

const MapWithMarkers = ({ center, markers }) => {
  return (
    <MapComponent
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '400px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      center={center}
      markers={markers}
    />
  );
};

export default MapWithMarkers;
