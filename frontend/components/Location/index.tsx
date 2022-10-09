import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/Location.module.scss';


type CoordinatesProps = {
  lat: number;
  lon: number;
  loading: boolean;
  error: any;
}

const Location = ({lat, lon, loading, error}: CoordinatesProps) => {
  if (!lat && !lon) {
    return (
      <Box className={styles['location-container']}>
        <h2 className={styles.message}>
          Allow permission to access location
        </h2>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles['location-container']}>
        <h3 className={styles.error}>
          {error}
        </h3>
      </Box>
    );
  }

  return (
    <Box className={styles['location-container']}>
      <h1 className={styles.title}>
        Foursquare in your location
      </h1>
      <h2 className={styles.title}>
        {`${lat}, ${lon}`}
      </h2>
    </Box>
  );
};

export default Location;