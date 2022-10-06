const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    FOURSQUARE_API_VERSION: Joi.string().required(),
    FOURSQUARE_API_KEY: Joi.string().required(),
    FOURSQUARE_CLIENT_ID: Joi.string().required(),
    FOURSQUARE_CLIENT_SECRET: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  foursquare_api: {
    url: `https://api.foursquare.com/${envVars.FOURSQUARE_API_VERSION}`,
    key: envVars.FOURSQUARE_API_KEY,
    client_id: envVars.FOURSQUARE_CLIENT_ID,
    client_secret: envVars.FOURSQUARE_CLIENT_SECRET,
  },
};
