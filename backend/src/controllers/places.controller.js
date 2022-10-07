const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { foursquareService } = require('../services');

const getPlaces = catchAsync(async (req, res) => {
  const places = await foursquareService.getNearbyPlaces(req.body);
  const placesWithPhotos = await foursquareService.getPlacesPhotos(places.results);
  res.status(httpStatus.OK).send({
    places: placesWithPhotos,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = foursquareService.getCategories();
  res.status(httpStatus.OK).send({
    categories,
  });
});

module.exports = {
  getPlaces,
  getCategories,
};
