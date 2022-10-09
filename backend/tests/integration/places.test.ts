import request from 'supertest';
import nock from 'nock';
import httpStatus from 'http-status';
import app from '../../src/app';
import config from '../../src/config/config';
import placesDummyData from '../../src/data/placesDummyData.json';

describe('Places routes', () => {
  describe('GET /v1/places', () => {
    test('should return 200 and successfully return list of places with photos', async () => {
      // v1/location expected response
      const placeResponse = {
        id: '1',
        name: 'Example Gelatos',
        categories: [
          {
            label: 'Ice Cream Parlor',
            img: 'https://example.com/icecream_bg_64.png',
          },
        ],
        distance: '2.29 mi',
        formatted_address: '1 Example Road, Example, Greater London, EX1 1AA',
        photo: 'https://example.com/img/general/original/111.jpg',
      };
      // mock external api call to foursquare places
      nock(config.foursquare_api.url)
        .get('/places/search')
        .query({
          ll: '12.345678,-0.123456',
          sort: 'DISTANCE',
          categories: '17000',
        })
        .reply(200, placesDummyData);

      // mock external api call to foursquare places photos
      nock(config.foursquare_api.url)
        .get('/places/1/photos')
        .query({
          limit: 1,
        })
        .reply(200, [
          {
            id: '111',
            created_at: '2022-07-17T14:24:44.000Z',
            prefix: 'https://example.com/img/general/',
            suffix: '/111.jpg',
            width: 1440,
            height: 1920,
          },
        ]);

      nock(config.foursquare_api.url)
        .get('/places/2/photos')
        .query({
          limit: 1,
        })
        .reply(200, []);

      const testParams = {
        lat: '12.345678',
        lon: '-0.123456',
        categories: '17000',
      };
      const mapParameters = Object.keys(testParams).map((param) => `${param}=${testParams[param]}`);
      const requestUrl = ['/v1/places', '?', mapParameters.join('&')].join('');

      const response = await request(app).get(requestUrl);
      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.places).toHaveLength(2);
      expect(response.body.places[0]).toEqual(placeResponse);
    });

    test('should return 400 error if there are missing parameters', async () => {
      const response = await request(app).get('/v1/places');
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
  });
});
