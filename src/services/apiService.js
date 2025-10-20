
const API_BASE_URL = 'http://localhost:5150';


const defaultHeaders = {
    'Content-Type': 'application/json',
};


const handleResponse = async (response) => {
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        // If the response is 401 Unauthorized, redirect to login
        // But only if we're not already on the login page
        if (response.status === 401) {
            // Check if we're already on the login page to prevent redirect loops
            if (!window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
            return null;
        }

        
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            errorData = { message: response.statusText };
        }

        
        throw new Error(
            `API Error ${response.status}: ${errorData.message || 'Unknown error'}`
        );
    }

    
    if (response.status === 204) {
        return null;
    }
    return response.json();
};


export const get = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include', 
        ...options,
    });

    return handleResponse(response);
};

export const post = async (endpoint, data, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include', 
        body: JSON.stringify(data),
        ...options,
    });

    return handleResponse(response);
};



export const put = async (endpoint, data, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include', 
        body: JSON.stringify(data),
        ...options,
    });

    return handleResponse(response);
};



export const del = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        credentials: 'include',
        ...options,
    });

    return handleResponse(response);
};