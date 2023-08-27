const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
 * GET route handler for fetching items.
 * @route GET /items
 * @returns {Object} An object containing items fetched from the database.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                 The 'error' field contains an error message indicating the failure to fetch items.
 */
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

module.exports = router;
