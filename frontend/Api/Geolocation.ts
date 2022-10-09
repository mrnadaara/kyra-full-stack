import { useState, useEffect } from 'react';

export default function useGeolocation () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const checkPermission = () => {
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      if (result.state == 'prompt') {
        setLoading(true);
      }
    });
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      checkPermission();
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          setLat(coords.latitude);
          setLon(coords.longitude);
        },
        (error) => {
          if (error.code === 1) {
            setError("You denied permission to access location");
          } else if (error.code === 2) {
            setError("Cannot retrieve your position");
          }
        },
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