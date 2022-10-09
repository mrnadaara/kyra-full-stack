import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';
import Location from '../components/Location';
import Places from '../components/Places';
import SelectCategory from '../components/SelectCategory';
import { useCategories, usePlaces, useGeolocation } from '../Api';

type CategoryType = {
  label: string;
  id: string;
};

type PlaceType = {
  id: string;
  name: string;
  categories: {
    label: string;
    img: string;
  }
  distance: number;
  formatted_address: string;
  photo: string;
}

type useCategoryType = {
  categories: CategoryType[];
  isLoading: boolean;
  isError: any;
};

type useGeoLocationType = {
  lat: number;
  lon: number;
  geoLoading: boolean;
  geoError: any;
};

type usePlaceType = {
  places: PlaceType[];
  isLoading: boolean;
  isError: any;
  updatePlaces: () => void;
};

const Home: NextPage = () => {
  const [selectedCategories, setSelectedCategories] = useState('');
  const { lat, lon, geoLoading, geoError }: useGeoLocationType = useGeolocation();
  const { categories, isLoading: categoryLoading, isError: categoryError }: useCategoryType = useCategories();
  const { places, isLoading: placesLoading, isError: placeError, updatePlaces }: usePlaceType = usePlaces(lat, lon, selectedCategories);
  
  useEffect(() => {
    // get coordinates
  }, []);

  useEffect(() => {
    updatePlaces();
  }, [lat, lon, selectedCategories]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Nearby Places - Kyra Full-Stack</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.main}>
        <Location lat={lat} lon={lon} />
        <SelectCategory categories={categories} updateSelectedCategories={setSelectedCategories} />
        <Places places={places} />
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
