import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { foursquareService } from '../services';

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

export {
  getPlaces,
  getCategories,
};
