import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { foursquareService } from '../services';

const getPlaces = catchAsync(async (req: Request, res: Response):Promise<void> => {
  if (!req.query.lat && !req.query.lon) {
    res.status(httpStatus.BAD_REQUEST).send();
    return;
  }

  let categories: any = '';

  if (req.query.categories) {
    categories = req.query.categories;
  }
  
  const {lat, lon}  = req.query as any;
  const places = await foursquareService.getNearbyPlaces({lat, lon, categories});
  const placesWithPhotos = await foursquareService.getPlacesPhotos(places.results);
  res.status(httpStatus.OK).send({
    places: placesWithPhotos,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response):Promise<void> => {
  const categories = foursquareService.getCategories();
  res.status(httpStatus.OK).send({
    categories,
  });
});

export {
  getPlaces,
  getCategories,
};
