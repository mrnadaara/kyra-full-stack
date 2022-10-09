/* eslint-disable @next/next/no-img-element */
import Box from '@mui/material/Box';
import PlaceIcon from '@mui/icons-material/Place';
import CircularProgress from '@mui/material/CircularProgress';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';

type CategoryType = {
  label: string;
  img: string;
};

type PlacesProps = {
  places: PlaceType[];
  loading: boolean;
  error: any;
};

type PlaceType = {
  id: string;
  name: string;
  categories: CategoryType[];
  distance: number;
  formatted_address: string;
  photo: string;
}

const CategoryItems = styled(ImageListItemBar)`
  background: none;
  margin-bottom: 60px;

  img {
    height: 30px;
    width: 30px;
  }

  :hover {
    color: #2e8b57;
  }
`;

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

const Places = ({ places, loading, error }: PlacesProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex' }}>
        <h3 style={{ fontSize: '17px', textAlign: 'center'}}>
          {error}
        </h3>
      </Box>
    );
  }

  if (!places.length) {
    return (
      <Box sx={{ display: 'flex' }}>
        <h3 style={{ fontSize: '17px', textAlign: 'center'}}>
          Didn&apos;t find anything
        </h3>
      </Box>
    );
  }

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
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
            }}
            title={item.distance}
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${item.distance}`}
              >
                <PlaceIcon />
              </IconButton>
            }
            actionPosition="left"
          />
          <CategoryItems
            position="bottom"
            actionIcon={
              <>
                {item.categories.map((cat: CategoryType, index: number) => (
                  <IconButton
                    key={`${index}-${cat.img}`}
                    sx={{ color: 'white' }}
                    aria-label={`star ${cat.label}`}
                  >
                    <Tooltip title={cat.label}>
                      <img
                        src={cat.img}
                        alt={cat.label}
                        loading="lazy"
                      />
                    </Tooltip>
                  </IconButton>
                ))}
              </>
            }
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.formatted_address}
          />
        </ImageListItem>
      ))}
    </ImageGalleryList>
  );
};

export default Places;