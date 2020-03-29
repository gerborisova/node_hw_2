import GroupService from './GroupService';
import Group from '../models/Group';

describe('GroupService', () => {
    beforeAll(() => {
        Group.findAll = jest.fn();
        Group.create = jest.fn();
        Group.update = jest.fn();
        Group.destroy = jest.fn();
    });
    beforeEach(() => {
        Group.findAll.mockClear();
        Group.create.mockClear();
        Group.update.mockClear();
        Group.destroy.mockClear();
    });
    describe('getAllGroups()', () => {
        test('Should call User.findAll() with correct data', () => {
            GroupService.getAllGroups();
            expect(Group.findAll.mock.calls[0]).toEqual([]);
        });
    });
    describe('checkExisting()', () => {
        test('Should call User.findAll() with correct data', () => {
            const groupname = 'test_name';
            GroupService.checkExisting(groupname);
            expect(Group.findAll.mock.calls[0][0]).toStrictEqual({
                where :{
                    group_name: groupname
                }
            });
        });
    });
    describe('createGroup()', () => {
        test('Should call User.create() with correct data', () => {
            const groupData = {
                uid: 'testuid',
                group_name: 'test_nams'
            };
            GroupService.createGroup(groupData.uid, groupData.group_name);
            expect(Group.create.mock.calls[0][0]).toStrictEqual(groupData);
        });
    });
    describe('getGroupById()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            GroupService.getGroupById(id);
            expect(Group.findAll.mock.calls[0][0]).toStrictEqual({
                where : {
                    uid: id
                }
            });
        });
    });
    describe('updateGroup()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            const updateBody = { group_name: 'testname' };
            GroupService.updateGroup(updateBody, id);
            expect(Group.update.mock.calls[0][0]).toStrictEqual(updateBody);
            expect(Group.update.mock.calls[0][1]).toStrictEqual({
                where: {
                    uid: id
                },
                returning: true,
                plain: true
            });
        });
    });
    describe('deleteGroup()', () => {
        test('Should call User.findAll() with correct data', () => {
            const id = 'test_id';
            GroupService.deleteGroup(id);
            expect(Group.destroy.mock.calls[0][0]).toStrictEqual({
                where: {
                    uid: id
                },
                returning: true,
                plain: true
            });
        });
    });
});
