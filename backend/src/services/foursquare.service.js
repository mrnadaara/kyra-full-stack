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
    const response = await fetch(`${config.foursquare_api.url}/places?${params}`);
    return await response.json();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
  }
};

const getPlacesPhotos = async (places) => {
  const placesWithPhotos = places.map(async () => {
    try {
      const params = new URLSearchParams({
        ll: `${lat},${lon}`,
        sort: 'DISTANCE',
        categories,
      });
      const response = await fetch(`${config.foursquare_api.url}/places?${params}`);
      return await response.json();
    } catch (error) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
    }
  });
};

module.exports = {
  getNearbyPlaces,
  getPlacesPhotos,
};
