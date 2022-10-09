import Box from '@mui/material/Box';
import styles from '../../styles/Location.module.scss';


type CoordinatesProps = {
  lat: number;
  lon: number;
}

const Location = ({lat, lon}: CoordinatesProps) => (
  <Box className={styles['location-container']}>
    <h1 className={styles.title}>
      Foursquare in your location
    </h1>
    <h2 className={styles.title}>
      {`${lat}, ${lon}`}
    </h2>
  </Box>
);

export default Location;