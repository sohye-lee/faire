import { useEffect, useState } from 'react';

interface UseCoordsState {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = (coords: GeolocationPosition) => {
    console.log(coords);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
