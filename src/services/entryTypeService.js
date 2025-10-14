import { get } from './apiService';

export const getEntryTypes = () => {
    return get('/api/entrytypes');
};