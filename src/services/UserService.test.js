
import UserService from './UserService';
import User from '../models/User';
import { Op } from 'sequelize';

describe('UserService', () => {
    describe('validateUser()', () => {
        test('Should validate user data format without error', () => {
            const correctUser = {
                login: 'test@test.com',
                password: 'Testpassword123',
                age: 23
            };
            const result = UserService.validateUser(correctUser);
            expect(result).toHaveProperty('error', null);
        });
        test('Should validate user data format with error for login', () => {
            const correctUser = {
                login: '',
                password: 'Testpassword123',
                age: 23
            };
            const result = UserService.validateUser(correctUser);
            expect(result).toHaveProperty('error');
            expect(result.error.details[0].path).toContain('login');
        });
        test('Should validate user data format with error for password', () => {
            const correctUser = {
                login: 'testlogin',
                password: '........',
                age: 23
            };
            const result = UserService.validateUser(correctUser);
            expect(result).toHaveProperty('error');
            expect(result.error.details[0].path).toContain('password');
        });
        test('Should validate user data format with error for age', () => {
            const correctUser = {
                login: 'testlogin',
                password: 'testpassword123',
                age: 999
            };
            const result = UserService.validateUser(correctUser);
            expect(result).toHaveProperty('error');
            expect(result.error.details[0].path).toContain('age');
        });
    });
    beforeAll(() => {
        User.findAll = jest.fn();
        User.create = jest.fn();
        User.update = jest.fn();
    });
    beforeEach(() => {
        User.findAll.mockClear();
        User.create.mockClear();
        User.update.mockClear();
    });
    describe('getAllUsers()', () => {
        test('Should call User.findAll() with correct data', () => {
            UserService.getAllUsers();
            expect(User.findAll.mock.calls[0][0]).toStrictEqual({
                where : {
                    isDeleted: false
                }
            });
        });
    });
    describe('checkExisting()', () => {
        test('Should call User.findAll() with correct data', () => {
            const login = 'test_login';
            UserService.checkExisting(login);
            expect(User.findAll.mock.calls[0][0]).toStrictEqual({
                where :{
                    login,
                    isDeleted:false
                }
            });
        });
    });
    describe('createUser()', () => {
        test('Should call User.create() with correct data', () => {
            const userData = {
                uid: 'testuid',
                login: 'testlogin',
                password: 'testpassword',
                age: 15,
                isDeleted: false
            };
            UserService.createUser(userData.uid, userData.login, userData.password, userData.age, userData.isDeleted);
            expect(User.create.mock.calls[0][0]).toStrictEqual(userData);
        });
    });
    describe('getUserById()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            UserService.getUserById(id);
            expect(User.findAll.mock.calls[0][0]).toStrictEqual({
                where : {
                    uid: id,
                    isDeleted: false
                }
            });
        });
    });
    describe('deleteUser()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            UserService.deleteUser(id);
            expect(User.update.mock.calls[0][0]).toStrictEqual({ isDeleted : true });
            expect(User.update.mock.calls[0][1]).toStrictEqual({
                where: {
                    uid: id,
                    isDeleted: false
                },
                returning: true,
                plain: true
            });
        });
    });
    describe('updateUser()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            const updateBody = { login: 'testlogin' };
            UserService.updateUser(updateBody, id);
            expect(User.update.mock.calls[0][0]).toStrictEqual(updateBody);
            expect(User.update.mock.calls[0][1]).toStrictEqual({
                where: {
                    uid: id,
                    isDeleted: false
                },
                returning: true,
                plain: true
            });
        });
    });
    describe('getSuggestedUsers()', () => {
        test('Should call User.findAll() with correct data', () => {
            const limit = 5;
            const substring = 'teststring';
            UserService.getSuggestedUsers(substring, limit);
            expect(User.findAll.mock.calls[0][0]).toStrictEqual({
                where: {
                    login: {
                        [Op.like] : `%${substring}%`
                    },
                    isDeleted: false
                },
                limit,
                returning: true
            });
        });
    });
});
