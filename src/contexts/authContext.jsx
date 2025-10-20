'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, logout as logoutUser  } from '../services/authService';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const loadUser = async () => {
            try {
               
                const userData = await getCurrentUser();
                if (userData && "id" in userData) {
                    setUser(userData);
                }
            } catch (err) {
                console.error('Error loading user:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    // Login function
    const login = async (userData) => {
        console.log('Logging in user:', userData);
        setUser(userData);
    };

    // Logout function
    const logout = async () => {
        try {
            console.log('Logging out user');
            await logoutUser();

            setUser(null);
            window.location.href = '/auth/login';
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
            window.location.href = '/auth/login';
        }
    };
    const hasRole = (role) => {
        if (!user || !user.roles) return false;
        return user.roles.includes(role);
    };



    const isAdmin = () => hasRole('Admin');




    const value = {
        user,
        loading,
        error,
        login,
        logout,
        hasRole,
        isAdmin,
      
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;