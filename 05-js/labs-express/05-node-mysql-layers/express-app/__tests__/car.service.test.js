import { jest } from '@jest/globals';

jest.unstable_mockModule('../app/config/db.js', () => ({
    default: {
        query: jest.fn()
    }
}));

describe('Car Service', () => {
    let carService;
    let db;

    beforeEach(async () => {
        db = await import('../app/config/db.js');
        carService = await import('../app/services/car.service.js');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllCars should return all cars', async () => {
        const mockCars = [
            { id: 1, car_name: 'Toyota Camry', color: 'Blue' },
            { id: 2, car_name: 'Honda Civic', color: 'Red' }
        ];
        db.default.query.mockResolvedValue([mockCars]);

        const result = await carService.getAllCars();

        expect(db.default.query).toHaveBeenCalledWith('SELECT * FROM cars');
        expect(result).toEqual(mockCars);
    });

    test('getCarById should return a car by id', async () => {
        const mockCar = { id: 1, car_name: 'Toyota Camry', color: 'Blue' };
        db.default.query.mockResolvedValue([[mockCar]]);

        const result = await carService.getCarById(1);

        expect(db.default.query).toHaveBeenCalledWith('SELECT * FROM cars WHERE id = ?', [1]);
        expect(result).toEqual(mockCar);
    });

    test('getCarById should return undefined when car not found', async () => {
        db.default.query.mockResolvedValue([[]]);

        const result = await carService.getCarById(999);

        expect(result).toBeUndefined();
    });

    test('createCar should create a new car', async () => {
        const carData = { car_name: 'Tesla Model 3', color: 'White' };
        const mockResult = { insertId: 3 };
        db.default.query.mockResolvedValue([mockResult]);

        const result = await carService.createCar(carData);

        expect(db.default.query).toHaveBeenCalledWith(
            'INSERT INTO cars (car_name, color) VALUES (?, ?)',
            ['Tesla Model 3', 'White']
        );
        expect(result).toEqual({ message: 'Car added successfully', id: 3 });
    });

    test('updateCar should update an existing car', async () => {
        const existingCar = { id: 1, car_name: 'Toyota Camry', color: 'Blue' };
        const updateData = { car_name: 'Toyota Camry Hybrid' };
        const mockResult = { affectedRows: 1 };
        
        db.default.query
            .mockResolvedValueOnce([[existingCar]])
            .mockResolvedValueOnce([mockResult]);

        const result = await carService.updateCar(1, updateData);

        expect(db.default.query).toHaveBeenCalledTimes(2);
        expect(db.default.query).toHaveBeenNthCalledWith(2,
            'UPDATE cars SET car_name = ?, color = ? WHERE id = ?',
            ['Toyota Camry Hybrid', 'Blue', 1]
        );
        expect(result).toEqual({ message: 'Car updated successfully', id: 1 });
    });

    test('updateCar should return null when car not found', async () => {
        db.default.query.mockResolvedValue([[]]);

        const result = await carService.updateCar(999, { car_name: 'Test' });

        expect(result).toBeNull();
    });

    test('deleteCar should delete a car', async () => {
        const mockResult = { affectedRows: 1 };
        db.default.query.mockResolvedValue([mockResult]);

        const result = await carService.deleteCar(1);

        expect(db.default.query).toHaveBeenCalledWith('DELETE FROM cars WHERE id = ?', [1]);
        expect(result).toEqual({ message: 'Car deleted successfully', id: 1 });
    });

    test('deleteCar should return null when car not found', async () => {
        const mockResult = { affectedRows: 0 };
        db.default.query.mockResolvedValue([mockResult]);

        const result = await carService.deleteCar(999);

        expect(result).toBeNull();
    });
});