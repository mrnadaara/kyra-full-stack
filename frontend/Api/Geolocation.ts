import { useState, useEffect } from 'react';

export default function useGeolocation () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser' as any);
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          setLat(coords.latitude);
          setLon(coords.longitude);
        },
        (error) => setError(error as any),
      );
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [lat, lon, error]);

  return {
    lat,
    lon,
    geoLoading: loading,
    geoError: error
  }
}