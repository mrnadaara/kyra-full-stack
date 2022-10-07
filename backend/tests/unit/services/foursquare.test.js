const nock = require('nock');
// const httpStatus = require('http-status');
const { foursquareService } = require('../../../src/services');
const config = require('../../../src/config/config');
const placesDummyData = require('../../../src/data/places_dummy_data.json');

describe('Foursquare services', () => {
  describe('getNearByPlaces', () => {
    test('should return list of places', async () => {
      // mock external api call to foursquare places
      nock(config.foursquare_api.url)
        .get('/places/search')
        .query({
          ll: '12.345678,-0.123456',
          sort: 'DISTANCE',
          categories: '17000',
        })
        .reply(200, placesDummyData);

      const places = await foursquareService.getNearbyPlaces({
        lat: '12.345678',
        lon: '-0.123456',
        categories: '17000',
      });

      expect(places.results[0]).toEqual(placesDummyData.results[0]);
    });

    test('should return APIerror when exception is raised', async () => {
      await expect(() =>
        foursquareService.getNearbyPlaces({
          lat: '12.345678',
          lon: '-0.123456',
          categories: '15000',
        })
      ).rejects.toThrow('Could not retrieve places');
    });
  });
});
