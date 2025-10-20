import { del, get, put } from './apiService';

export const getUserProfile = () => {
    return get('/api/user/profile');
};

export const updateUserProfile = (profileData) => {
    return put('/api/user/profile', profileData);
};
export const deleteUserProfile = () => {
    return del('/api/user/profile')
};