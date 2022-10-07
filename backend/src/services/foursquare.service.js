const Promise = require('bluebird');
const fetch = require('node-fetch');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const categoryJson = require('../data/places_categories.json');

/**
 * fetch list of places nearby
 * @param {Object} locationBody
 * @returns {Promise<Place>}
 */
const getNearbyPlaces = async ({ lat, lon, categories }) => {
  try {
    const params = new URLSearchParams({
      sort: 'DISTANCE',
      categories,
    });
    const response = await fetch(`${config.foursquare_api.url}/places/search?${params.toString()}&ll=${lat},${lon}`, {
      headers: {
        Authorization: config.foursquare_api.key,
      },
    });
    return await response.json();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
  }
};

/**
 * fetch photo of a place
 * @param {string} id
 * @returns {Promise<Place>}
 */
const fetchPhoto = async (id) => {
  try {
    const params = new URLSearchParams({
      limit: 1,
    });
    const response = await fetch(`${config.foursquare_api.url}/places/${id}/photos?${params.toString()}`, {
      headers: {
        Authorization: config.foursquare_api.key,
      },
    });
    const photos = await response.json();

    if (!photos.length) {
      return '';
    }

    return `${photos[0].prefix}original${photos[0].suffix}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve photo');
  }
};

/**
 * transform list of places with fetched photos
 * @param {Array<Places>} places
 * @returns {Promise<Place>}
 */
const getPlacesPhotos = async (places) => {
  try {
    const placesWithPhotos = await Promise.map(places, async (place) => {
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

const getCategories = () => {
  return categoryJson;
};

module.exports = {
  getNearbyPlaces,
  getPlacesPhotos,
  getCategories,
};
