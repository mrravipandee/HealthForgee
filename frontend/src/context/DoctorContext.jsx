import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [profileData, setProfileData] = useState(null);

    // Getting Doctor appointment data from Database using API
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting Doctor profile data from Database using API
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting Doctor dashboard data from Database using API
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to cancel doctor appointment using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to complete doctor appointment using API
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to update doctor profile using API
    const updateProfile = async (profileData) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', profileData, { 
                headers: { dtoken: dToken } 
            });
            
            if (data.success) {
                toast.success(data.message);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Logout function
    const logout = () => {
        setDToken('');
        localStorage.removeItem('dToken');
        setAppointments([]);
        setDashData(null);
        setProfileData(null);
    };

    const value = {
        dToken, setDToken,
        appointments, setAppointments,
        dashData, setDashData,
        profileData, setProfileData,
        getAppointments,
        getProfileData,
        getDashData,
        cancelAppointment,
        completeAppointment,
        updateProfile,
        logout,
        backendUrl
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

DoctorContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default DoctorContextProvider;