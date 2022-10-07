const Joi = require('joi');

const getPlaces = {
  body: Joi.object().keys({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
    categories: Joi.string(),
  }),
};

export {
  getPlaces,
}
