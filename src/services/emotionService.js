import { get } from './apiService';

export const getEmotions = () => {
    return get('/api/emotions');
};