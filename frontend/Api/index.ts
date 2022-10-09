import { useState, useEffect } from 'react';
import useGeolocation from './Geolocation';
import { placesParamsType } from '../utils/types';

export function useCategories () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      return await response.json();
    } catch (error) {
      throw new Error('Could not retrieve categories');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories().then(
      ({categories}) => setData(categories),
      (error) => setError(error.message),
    );
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return {
    categories: data || [],
    isLoading: loading,
    isError: error
  }
}

export function usePlaces (lat: number, lon: number, categories: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchPlaces = async (placesParams: placesParamsType) => {
    try {
      const mapParameters = Object.keys(placesParams).map((param) => `${param}=${placesParams[param]}`);
      const requestUrl = ['/api/places', '?', mapParameters.join('&')].join('');
      const response = await fetch(requestUrl);
      return await response.json();
    } catch (error) {
      throw new Error('Could not retrieve places');
    }
  };

  const updatePlaces = () => {
    if (!lat && !lon) {
      return;
    }

    setLoading(true);
    fetchPlaces({lat, lon, categories}).then(
      ({places}) => setData(places),
      (error) => setError(error.message),
    );
  };

  useEffect(() => {
    updatePlaces();
  }, []);

  useEffect(() => {
    updatePlaces();
  }, [lat, lon, categories]);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return {
    places: data || [],
    isLoading: loading,
    isError: error,
  }
}

export {
  useGeolocation
}