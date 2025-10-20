import { get } from './apiService';

export const getEmotions = () => {
    return get('/api/emotions');
};
export const getEmotionStats = () => {
    return get('/api/emotions/stats');
};