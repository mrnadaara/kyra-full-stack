const express = require('express');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation');
const locationController = require('../../controllers/location.controller');

const router = express.Router();

router.post('/', validate(locationValidation.getPlaces), locationController.getPlaces);
router.get('/categories', locationController.getCategories);

module.exports = router;

/**
 * @swagger
 * /location:
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
 *                location-success:
 *                    $ref: '#/components/examples/LocationSuccess'
 *       "502":
 *         $ref: '#/components/responses/BadGateway'
 */
