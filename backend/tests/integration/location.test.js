const request = require('supertest');
const nock = require('nock');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');
const placesDummyData = require('../../src/data/places_dummy_data.json');

describe('Location routes', () => {
  describe('POST /v1/location', () => {
    test('should return 200 and successfully return', async () => {
      // v1/location expected response
      const locationResponse = {
        id: 1,
        name: '',
        categories: [
          {
            label: 'Ice Cream Parlor',
            img: 'https://example.com/icecream_64.png',
          },
        ],
        distance: 3694,
        formatted_address: '1 Example Road, Example, Greater London, EX1 1AA',
        photo: 'https://example.com/img/general/original/111.jpg',
      };
      // mock external api call to foursquare places
      nock(config.foursquare_api.url)
        .get('/places')
        .query({
          ll: '12.345678,-0.123456',
          sort: 'DISTANCE',
          open_now: 'true',
          categories: '17000',
        })
        .reply(200, placesDummyData);

      // mock external api call to foursquare places photos
      nock(config.foursquare_api.url)
        .get('/places/1/photos')
        .query({
          limit: 1,
          classifications: 'outdoor',
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
        .reply(200, [
          {
            id: '122',
            created_at: '2022-07-17T14:24:44.000Z',
            prefix: 'https://example.com/img/general/',
            suffix: '/122.jpg',
            width: 1440,
            height: 1920,
          },
        ]);

      const response = await request(app).post('/v1/location').send({
        lat: '12.345678',
        lon: '-0.123456',
        categories: '17000',
      });

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body.places).toHaveLength(2);
      expect(response.body.places[0]).toEqual(locationResponse);
    });

    test('should return 400 error if there are missing parameters', async () => {
      const response = await request(app).post('/v1/location').send();
      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
  });
});
