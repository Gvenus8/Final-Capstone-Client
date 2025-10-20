import { get, post, put, del } from './apiService';


export const getEntries = (page = 1, pageSize = 10) => {
    return get(`/api/entries?page=${page}&pageSize=${pageSize}`);
};

export const getEntry = (id) => {
    return get(`/api/entries/${id}`);
};

export const createEntry = (entryData) => {
    return post('/api/entries', entryData);
};

export const updateEntry = (id, entryData) => {
    return put(`/api/entries/${id}`, entryData);
};

export const deleteEntry = (id) => {
    return del(`/api/entries/${id}`);
};
export const getEntryCount = () => {
    return get('/api/entries/count');
};