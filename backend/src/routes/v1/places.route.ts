import express from 'express';
import { placesController } from'../../controllers';

const router = express.Router();

router.get('/', placesController.getPlaces);
router.get('/categories', placesController.getCategories);

export default router;

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get list of places
 *     description: Will fetch a list of nearby places with photos sorted by closest to farthest
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: categories
 *         required: true
 *         schema:
 *           type: string
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
