/* eslint-disable @next/next/no-img-element */
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

type PlacesProps = {
  places: PlaceType[];
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

const ImageGalleryList = styled('ul')(({ theme }) => ({
  display: 'grid',
  width: '70%',
  padding: 0,
  margin: theme.spacing(0, 4),
  gap: 8,
  [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
  },
  [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
  },
}));

const Places = ({ places }: PlacesProps) => {
  return (
    <ImageGalleryList>
      {places.map((item) => (
        <ImageListItem key={item.photo}>
          <img
            src={item.photo ? item.photo : '/no-image.jpg'}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.formatted_address}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageGalleryList>
  );
};

export default Places;