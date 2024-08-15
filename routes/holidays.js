const express = require('express');
const axios = require('axios');
const cache = require('../cache/cache');
require('dotenv').config();

const router = express.Router();

// Fetch holidays.
router.get('/holidays', async (req, res) => {
    const { country, year } = req.query;

    if (!country || !year) {
        return res.status(400).json({ error: 'Country and year are required' });
    }

    const cacheKey = `holidays_${country}_${year}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const response = await axios.get(`${process.env.CALENDARIFIC_API_URL}/holidays`, {
            params: {
                api_key: process.env.CALENDARIFIC_API_KEY,
                country,
                year
            }
        });

        const holidays = response.data;
        cache.set(cacheKey, holidays);

        res.json(holidays);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching holidays from Calendarific' });
    }
});

// Fetch countries.
router.get('/countries', async (req, res) => {
    const response = await axios.get(`${process.env.CALENDARIFIC_API_URL}/countries`, {
        params: {
            api_key: process.env.CALENDARIFIC_API_KEY
        }
    });

    res.json(response.data);
    try {
       
    } catch (error) {
        res.status(500).json({ error: 'Error fetching countries from Calendarific' });
    }
});

module.exports = router;