import Box from '@mui/material/Box';
import SelectCategory from './SelectCategory';
import styles from '../../styles/Location.module.scss';


type CoordinatesProps = {
  lat: string;
  lon: string;
}

const Location = ({lat, lon}: CoordinatesProps) => (
  <Box className={styles['location-container']}>
    <h1 className={styles.title}>
      Foursquare in your location
    </h1>
    <h2>
      ({lat} {lon})
    </h2>
    <Box>
      <SelectCategory />
    </Box>
  </Box>
);

export default Location;