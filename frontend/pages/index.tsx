import { useState } from 'react';
import type { NextPage } from 'next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';
import GeoDialog from '../components/GeoDialog';
import Location from '../components/Location';
import Places from '../components/Places';
import SelectCategory from '../components/SelectCategory';
import { useCategories, usePlaces, useGeolocation } from '../Api';
import {
  useCategoryType,
  useGeoLocationType,
  usePlaceType
} from '../utils/types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Home: NextPage = () => {
  const [selectedCategories, setSelectedCategories] = useState('');
  const { lat, lon, geoLoading, geoError }: useGeoLocationType = useGeolocation();
  const { categories, isLoading: categoryLoading, isError: categoryError }: useCategoryType = useCategories();
  const { places, isLoading: placesLoading, isError: placeError }: usePlaceType = usePlaces(lat, lon, selectedCategories);
  
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        <Head>
          <title>Nearby Places - Kyra Full-Stack</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <GeoDialog loading={geoLoading}/>
        <div className={styles.main}>
          <Location
            lat={lat}
            lon={lon}
            loading={geoLoading}
            error={geoError}
          />
          <SelectCategory
            categories={categories} 
            updateSelectedCategories={setSelectedCategories} 
            loading={categoryLoading} 
            error={categoryError} 
          />
          <Places 
            places={places}
            loading={placesLoading} 
            error={placeError} 
          />
        </div>
        <footer className={styles.footer}>
          <a
            href="https://www.linkedin.com/in/sharmarke-ahmed/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by Sharmaarke Ahmed as part of an assessment
          </a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default Home
