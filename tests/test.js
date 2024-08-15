const request = require('supertest');
const express = require('express');
const holidaysRoutes = require('../routes/holidays');

const app = express();
app.use('/api', holidaysRoutes);

describe('GET /api/holidays', () => {
    it('should fetch holidays for a specific country and year', async () => {
        const response = await request(app).get('/api/holidays').query({ country: 'PK', year: '2024' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('response');
    });
});

describe('GET /api/countries', () => {
    it('should fetch the list of supported countries', async () => {
        const response = await request(app).get('/api/countries');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('response');
    });
});