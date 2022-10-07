const fetch = require('node-fetch');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const config = require('../config/config');

const foursquareClient = (url) => ({
  async get(parameters) {
    try {
      const mapParameters = Object.keys(parameters).map((param) => `${param}=${parameters[param]}`);
      const requestUrl = [url, '?', mapParameters.join('&')].join('');
      const response = await fetch(`${config.foursquare_api.url}${requestUrl}`, {
        headers: {
          Authorization: config.foursquare_api.key,
        },
      });
      return await response.json();
    } catch (error) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
    }
  },
  async post(parameters) {
    try {
      const response = await fetch(`${config.foursquare_api.url}${url}`, {
        headers: {
          Authorization: config.foursquare_api.key,
        },
        method: 'POST',
        body: parameters,
      });
      return await response.json();
    } catch (error) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Could not retrieve places');
    }
  },
});

module.exports = foursquareClient;
