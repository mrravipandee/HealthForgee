'use client';

import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '₹';
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    
    console.log('Backend URL from env:', backendUrl); // Debug log

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '');
    const [userData, setUserData] = useState(false);
    
    console.log('Initial token from localStorage:', typeof window !== 'undefined' ? localStorage.getItem('token') : 'No localStorage available'); // Debug log

    // Set default Authorization header for all requests if token exists
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Save token to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, [token]);

    // Get Doctors from backend
    const getDoctosData = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        }
    }, [backendUrl]);

    // Get User Profile from backend
    const loadUserProfileData = useCallback(async () => {
        if (!token) return;

        try {
            console.log('Loading user profile with token:', token);
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Profile response:', data);
            if (data.success) {
                setUserData(data.user); // Changed from userData to user as per backend response
                console.log('User data set:', data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log('Profile load error:', error);
            toast.error(error.response?.data?.message || error.message);
        }
    }, [token, backendUrl]);

    // Load doctors on first mount
    useEffect(() => {
        getDoctosData();
    }, [getDoctosData]);

    // Load user profile whenever token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token, loadUserProfileData]);

    const value = {
        doctors,
        getDoctosData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
