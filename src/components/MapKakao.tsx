import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function MapKakao({ lat, lng }: { lat: number; lng: number }) {
  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '360px' }}>
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
