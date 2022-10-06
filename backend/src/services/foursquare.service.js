const fetch = require('node-fetch');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const getNearbyPlaces = async ({ lat, lon, categories }) => {
  try {
    const params = new URLSearchParams({
      ll: `${lat},${lon}`,
      sort: 'DISTANCE',
      categories,
    });
    const response = await fetch(`${config.foursquare_api.url}/places?${params.toString()}`);
    return await response.json();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
  }
};

const getPlacesPhotos = async (places) => {
  const placesWithPhotos = places.map(async (place) => {
    try {
      const params = new URLSearchParams({
        limit: 1,
      });
      const response = await fetch(`${config.foursquare_api.url}/places/${place.fsq_id}/photos/?${params.toString()}`);
      const photos = await response.json();

      return {
        id: place.fsq_id,
        name: place.name,
        categories: place.categories.map((category) => ({
          label: category.name,
          img: `${category.icon.prefix}64${category.icon.suffix}`,
        })),
        distance: place.distance,
        formatted_address: place.formatted_address,
        photo: `${photos[0].prefix}original${photos[0].suffix}`,
      };
    } catch (error) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve photos');
    }
  });

  return placesWithPhotos;
};

module.exports = {
  getNearbyPlaces,
  getPlacesPhotos,
};
