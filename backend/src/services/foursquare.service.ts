import BlueBird from 'bluebird';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import FoursquareClient from '../utils/FoursquareClient';
import categoryJson from '../data/placesCategories.json';

type getNearbyType = {
  results: any[];
};

type locationBody = {
  lat: string;
  lon: string;
  categories: string;
}

type category = {
  id: number;
  label: string;
}

type placeWithPhoto = {
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

/**
 * fetch list of places nearby
 * @param {Object} locationBody
 * @returns {Promise<Place>}
 */
const getNearbyPlaces = async ({ lat, lon, categories }: locationBody): Promise<getNearbyType> => {
  try {
    const places = await FoursquareClient('/places/search').get({
      ll: `${lat},${lon}`,
      sort: 'DISTANCE',
      categories,
    });

    return places;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
  }
};

/**
 * fetch photo of a place
 * @param {string} id
 * @returns {Promise<Place>}
 */
const fetchPhoto = async (id: string): Promise<string> => {
  try {
    const photos = await FoursquareClient(`/places/${id}/photos`).get({
      limit: 1,
    });

    if (!photos.length) {
      return '';
    }

    return `${photos[0].prefix}original${photos[0].suffix}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, `Could not retrieve photos. ID:${id}`);
  }
};

/**
 * transform list of places with fetched photos
 * @param {Array<Places>} places
 * @returns {Promise<Place>}
 */
const getPlacesPhotos = async (places: Object[]): Promise<placeWithPhoto[]> => {
  try {
    const placesWithPhotos = await BlueBird.map(places, async (place) => {
      return {
        id: place.fsq_id,
        name: place.name,
        categories: place.categories.map((category) => ({
          label: category.name,
          img: `${category.icon.prefix}64${category.icon.suffix}`,
        })),
        distance: place.distance,
        formatted_address: place.location.formatted_address,
        photo: await fetchPhoto(place.fsq_id),
      };
    });

    return placesWithPhotos;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve list of photos');
  }
};

const getCategories = (): category[] => {
  return categoryJson;
};

export {
  getNearbyPlaces,
  getPlacesPhotos,
  getCategories,
};
