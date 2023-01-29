import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

export default function MapKakao({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '360px' }}>
      <MapMarker position={{ lat, lng }}>
        {/* <MarkerName>{title}</MarkerName> */}
      </MapMarker>
    </Map>
  );
}

const MarkerName = styled.div`
  color: black;
  width: 110%;
  background-color: #ff0000a0;
`;
