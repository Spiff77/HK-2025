import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../app/services/car.service.js', () => ({
    getAllCars: jest.fn(),
    getCarById: jest.fn(),
    createCar: jest.fn(),
    updateCar: jest.fn(),
    deleteCar: jest.fn()
}));

describe('Car Routes', () => {
    let carService;
    let carRoutes;
    let app;

    beforeEach(async () => {
        carService = await import('../app/services/car.service.js');
        carRoutes = await import('../app/routes/car.routes.js');
        app = express();
        app.use(express.json());
        app.use('/cars', carRoutes.default);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /cars should return a list of cars', async () => {
        const mockCars = [
            { id: 1, car_name: 'Toyota Camry', color: 'Blue' },
            { id: 2, car_name: 'Honda Civic', color: 'Red' }
        ];
        carService.getAllCars.mockResolvedValue(mockCars);

        const response = await request(app).get('/cars');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCars);
    });

    test('GET /cars should handle service errors', async () => {
        carService.getAllCars.mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/cars');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error' });
    });

    test('GET /cars/:id should return a specific car', async () => {
        const mockCar = { id: 1, car_name: 'Toyota Camry', color: 'Blue' };
        carService.getCarById.mockResolvedValue(mockCar);

        const response = await request(app).get('/cars/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCar);
    });

    test('GET /cars/:id should return 404 for non-existent car', async () => {
        carService.getCarById.mockResolvedValue(null);

        const response = await request(app).get('/cars/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Car not found' });
    });

    test('POST /cars should create a new car', async () => {
        const newCar = { car_name: 'Tesla Model 3', color: 'White' };
        const mockResult = { message: 'Car added successfully', id: 3 };
        carService.createCar.mockResolvedValue(mockResult);

        const response = await request(app)
            .post('/cars')
            .send(newCar);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockResult);
        expect(carService.createCar).toHaveBeenCalledWith(newCar);
    });

    test('POST /cars should return 400 for missing fields', async () => {
        const response = await request(app)
            .post('/cars')
            .send({ car_name: 'Tesla' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Please provide both car name and color' });
    });

    test('PUT /cars/:id should update a car', async () => {
        const updateData = { car_name: 'Tesla Model S' };
        const mockResult = { message: 'Car updated successfully', id: 1 };
        carService.updateCar.mockResolvedValue(mockResult);

        const response = await request(app)
            .put('/cars/1')
            .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
        expect(carService.updateCar).toHaveBeenCalledWith('1', updateData);
    });

    test('PUT /cars/:id should return 404 for non-existent car', async () => {
        carService.updateCar.mockResolvedValue(null);

        const response = await request(app)
            .put('/cars/999')
            .send({ car_name: 'Tesla' });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Car not found' });
    });

    test('PUT /cars/:id should return 400 when no fields to update', async () => {
        const response = await request(app)
            .put('/cars/1')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Please provide at least car name or color to update' });
    });

    test('DELETE /cars/:id should delete a car', async () => {
        const mockResult = { message: 'Car deleted successfully', id: 1 };
        carService.deleteCar.mockResolvedValue(mockResult);

        const response = await request(app).delete('/cars/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResult);
        expect(carService.deleteCar).toHaveBeenCalledWith('1');
    });

    test('DELETE /cars/:id should return 404 for non-existent car', async () => {
        carService.deleteCar.mockResolvedValue(null);

        const response = await request(app).delete('/cars/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Car not found' });
    });
});