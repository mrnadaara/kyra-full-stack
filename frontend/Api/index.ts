import { useState, useEffect } from 'react';

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
      (error) => setError(error),
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

export function usePlaces () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('/api/places');
      return await response.json();
    } catch (error) {
      throw new Error('Could not retrieve places');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPlaces().then(
      ({places}) => setData(places),
      (error) => setError(error),
    );
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [data, error]);

  return {
    places: data || [],
    isLoading: loading,
    isError: error
  }
}