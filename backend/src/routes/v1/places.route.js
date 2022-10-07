const express = require('express');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation');
const locationController = require('../../controllers/places.controller');

const router = express.Router();

router.post('/', validate(locationValidation.getPlaces), locationController.getPlaces);
router.get('/categories', locationController.getCategories);

module.exports = router;

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Get list of places
 *     description: Will fetch a list of nearby places with photos sorted by closest to farthest
 *     parameters:
 *       - name: lat
 *         required: true
 *         type: string
 *       - name: lon
 *         required: true
 *         type: string
 *       - name: categories
 *         required: true
 *         type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Places'
 *             examples:
 *                places-success:
 *                    $ref: '#/components/examples/PlacesSuccess'
 *       "502":
 *         $ref: '#/components/responses/BadGateway'
 */

/**
 * @swagger
 * /places/categories:
 *   get:
 *     summary: Get list of categories
 *     description: Will fetch a list of categories to filter places
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Categories'
 *             examples:
 *                categories-success:
 *                    $ref: '#/components/examples/CategoriesSuccess'
 *       "502":
 *         $ref: '#/components/responses/BadGateway'
 */
