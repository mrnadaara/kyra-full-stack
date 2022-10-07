import fetch from 'node-fetch';
import httpStatus from 'http-status';
import ApiError from './ApiError';
import config from '../config/config';

type FourSquareClient = {
  get: (parameters: any) => Promise<any>;
  post: (parameters: any) => Promise<any>;
};

const foursquareClient = (resource: string): FourSquareClient => ({
  async get(parameters) {
    try {
      const mapParameters = Object.keys(parameters).map((param) => `${param}=${parameters[param]}`);
      const requestUrl = [config.foursquare_api.url, resource, '?', mapParameters.join('&')].join('');
      const response = await fetch(requestUrl, {
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
      const response = await fetch(`${config.foursquare_api.url}${resource}`, {
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

export default foursquareClient;