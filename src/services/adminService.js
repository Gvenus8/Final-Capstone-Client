import { get, del } from './apiService';

export const getAllUsers = () => {
    return get('/api/admin/users');
};

export const getUserDetails = (userId) => {
    return get(`/api/admin/users/${userId}`);
};

export const deleteUser = (userId) => {
    return del(`/api/admin/users/${userId}`);
};

export const getStatistics = () => {
    return get('/api/admin/statistics');
};