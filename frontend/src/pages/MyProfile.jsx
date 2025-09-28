import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import PatientsInfo from '../components/PatientsInfo'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [showHealthForm, setShowHealthForm] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Color scheme
    const colors = {
        primary: '#252C62',    // Blue
        primaryLight: '#dbeafe', // Light blue
        primaryDark: '#1d4ed8',  // Dark blue
        secondary: '#577cff',   // Purple
        secondaryLight: '#ede9fe', // Light purple
        textDark: '#1f2937',    // Dark gray
        textLight: '#6b7280',   // Light gray
        border: '#e5e7eb',      // Border color
        background: '#f8fafc'   // Background
    }

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='max-w-4xl flex flex-col gap-6 pt-5 mx-auto px-4' style={{ color: colors.textDark }}>

            {/* Profile Header Section */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl' 
                 style={{ backgroundColor: colors.primaryLight, border: `1px solid ${colors.border}` }}>
                {isEdit ? (
                    <label htmlFor='image' className='cursor-pointer'>
                        <div className='inline-block relative'>
                            <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' 
                                 src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                            <div className='absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                <img className='w-8' src={assets.upload_icon} alt="Upload" />
                            </div>
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                ) : (
                    <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' 
                         src={userData.image} alt="Profile" />
                )}

                <div className='flex-1'>
                    {isEdit ? (
                        <input className='text-3xl font-bold mb-2 px-3 py-1 rounded border' 
                               style={{ backgroundColor: 'white', borderColor: colors.border }}
                               type="text" 
                               onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                               value={userData.name} />
                    ) : (
                        <p className='font-bold text-3xl mb-2' style={{ color: colors.primary }}>{userData.name}</p>
                    )}
                    <p className='text-lg' style={{ color: colors.textLight }}>{userData.email}</p>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className='bg-white p-6 rounded-xl shadow-sm border' style={{ borderColor: colors.border }}>
                <p className='font-semibold text-lg mb-4' style={{ color: colors.primary, borderBottom: `2px solid ${colors.primaryLight}`, paddingBottom: '8px' }}>
                    CONTACT INFORMATION
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <p className='font-medium mb-1' style={{ color: colors.textDark }}>Email ID</p>
                        <p className='text-blue-600'>{userData.email}</p>
                    </div>
                    <div>
                        <p className='font-medium mb-1' style={{ color: colors.textDark }}>Phone Number</p>
                        {isEdit ? (
                            <input className='w-full px-3 py-2 rounded border' 
                                   style={{ borderColor: colors.border }}
                                   type="text" 
                                   onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                   value={userData.phone} />
                        ) : (
                            <p style={{ color: colors.primary }}>{userData.phone}</p>
                        )}
                    </div>
                    <div className='md:col-span-2'>
                        <p className='font-medium mb-1' style={{ color: colors.textDark }}>Address</p>
                        {isEdit ? (
                            <div className='space-y-2'>
                                <input className='w-full px-3 py-2 rounded border' 
                                       style={{ borderColor: colors.border }}
                                       type="text" 
                                       placeholder="Address Line 1"
                                       onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                       value={userData.address.line1} />
                                <input className='w-full px-3 py-2 rounded border' 
                                       style={{ borderColor: colors.border }}
                                       type="text" 
                                       placeholder="Address Line 2"
                                       onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                       value={userData.address.line2} />
                            </div>
                        ) : (
                            <p style={{ color: colors.textLight }}>{userData.address.line1} {userData.address.line2 && <br />} {userData.address.line2}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Basic Information Section */}
            <div className='bg-white p-6 rounded-xl shadow-sm border' style={{ borderColor: colors.border }}>
                <p className='font-semibold text-lg mb-4' style={{ color: colors.primary, borderBottom: `2px solid ${colors.primaryLight}`, paddingBottom: '8px' }}>
                    BASIC INFORMATION
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <p className='font-medium mb-1' style={{ color: colors.textDark }}>Gender</p>
                        {isEdit ? (
                            <select className='w-full px-3 py-2 rounded border' 
                                    style={{ borderColor: colors.border }}
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender}>
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p style={{ color: colors.textLight }}>{userData.gender}</p>
                        )}
                    </div>
                    <div>
                        <p className='font-medium mb-1' style={{ color: colors.textDark }}>Date of Birth</p>
                        {isEdit ? (
                            <input className='w-full px-3 py-2 rounded border' 
                                   style={{ borderColor: colors.border }}
                                   type='date' 
                                   onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                   value={userData.dob} />
                        ) : (
                            <p style={{ color: colors.textLight }}>{userData.dob}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Health Information Section */}
            <div className='p-6 rounded-xl border' style={{ backgroundColor: colors.primaryLight, borderColor: colors.primary }}>
                <p className='font-semibold text-lg mb-4' style={{ color: colors.primaryDark }}>
                    HEALTH INFORMATION
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white p-4 rounded-lg shadow-sm border' style={{ borderColor: colors.border }}>
                        <p className='font-medium mb-3' style={{ color: colors.primary, borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>Physical Stats</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.primaryLight }}>
                                <span style={{ color: colors.textDark }}>Height:</span>
                                <span className='font-medium' style={{ color: colors.primary }}>{userData.height || 'Not provided'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.primaryLight }}>
                                <span style={{ color: colors.textDark }}>Weight:</span>
                                <span className='font-medium' style={{ color: colors.primary }}>{userData.weight || 'Not provided'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1'>
                                <span style={{ color: colors.textDark }}>Blood Group:</span>
                                <span className='font-medium' style={{ color: colors.primary }}>{userData.bloodGroup || 'Not selected'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white p-4 rounded-lg shadow-sm border' style={{ borderColor: colors.border }}>
                        <p className='font-medium mb-3' style={{ color: colors.primary, borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>Medical History</p>
                        <div className='space-y-3'>
                            <div className='py-1 border-b' style={{ borderColor: colors.primaryLight }}>
                                <span className='block mb-1' style={{ color: colors.textDark }}>Medical Conditions:</span>
                                <span style={{ color: colors.textLight }}>
                                    {userData.medicalConditions && userData.medicalConditions.length > 0 
                                        ? userData.medicalConditions.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div className='py-1 border-b' style={{ borderColor: colors.primaryLight }}>
                                <span className='block mb-1' style={{ color: colors.textDark }}>Current Medications:</span>
                                <span style={{ color: colors.textLight }}>
                                    {userData.currentMedications && userData.currentMedications.length > 0 
                                        ? userData.currentMedications.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div className='py-1'>
                                <span className='block mb-1' style={{ color: colors.textDark }}>Allergies:</span>
                                <span style={{ color: colors.textLight }}>
                                    {userData.allergies && userData.allergies.length > 0 
                                        ? userData.allergies.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lifestyle Information Section */}
            <div className='p-6 rounded-xl border' style={{ backgroundColor: colors.secondaryLight, borderColor: colors.secondary }}>
                <p className='font-semibold text-lg mb-4' style={{ color: colors.secondary }}>
                    LIFESTYLE INFORMATION
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white p-4 rounded-lg shadow-sm border' style={{ borderColor: colors.border }}>
                        <p className='font-medium mb-3' style={{ color: colors.secondary, borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>Diet & Nutrition</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span style={{ color: colors.textDark }}>Diet Preference:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.dietPreference || 'Not selected'}</span>
                            </div>
                            <div className='py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span className='block mb-1' style={{ color: colors.textDark }}>Dietary Restrictions:</span>
                                <span style={{ color: colors.textLight }}>
                                    {userData.dietaryRestrictions && userData.dietaryRestrictions.length > 0 
                                        ? userData.dietaryRestrictions.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div className='flex justify-between items-center py-1'>
                                <span style={{ color: colors.textDark }}>Health Goal:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.healthGoal || 'General Fitness'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white p-4 rounded-lg shadow-sm border' style={{ borderColor: colors.border }}>
                        <p className='font-medium mb-3' style={{ color: colors.secondary, borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>Activity & Habits</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span style={{ color: colors.textDark }}>Activity Level:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.activityLevel || 'Not selected'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span style={{ color: colors.textDark }}>Exercise Routine:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.exerciseRoutine || 'None specified'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span style={{ color: colors.textDark }}>Preferred Exercise:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.preferredExerciseType || 'Not specified'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1 border-b' style={{ borderColor: colors.secondaryLight }}>
                                <span style={{ color: colors.textDark }}>Sleep Duration:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.sleepDuration || 'Not specified'}</span>
                            </div>
                            <div className='flex justify-between items-center py-1'>
                                <span style={{ color: colors.textDark }}>Alcohol/Smoking:</span>
                                <span className='font-medium' style={{ color: colors.secondary }}>{userData.alcoholOrSmoking || 'No'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-4 mt-6 p-6 bg-white rounded-xl border' style={{ borderColor: colors.border }}>
                {isEdit ? (
                    <button 
                        onClick={updateUserProfileData} 
                        className='px-8 py-3 rounded-full font-medium transition-all shadow-sm hover:shadow-md'
                        style={{ 
                            backgroundColor: colors.primary, 
                            color: 'white',
                            border: `2px solid ${colors.primary}`
                        }}
                    >
                        Save Information
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEdit(true)} 
                        className='px-8 py-3 rounded-full font-medium transition-all shadow-sm hover:shadow-md'
                        style={{ 
                            backgroundColor: 'white', 
                            color: colors.primary,
                            border: `2px solid ${colors.primary}`
                        }}
                    >
                        Edit Profile
                    </button>
                )}
                
                <button 
                    onClick={() => setShowHealthForm(true)} 
                    className='px-8 py-3 rounded-full font-medium transition-all shadow-sm hover:shadow-md'
                    style={{ 
                        backgroundColor: colors.secondary, 
                        color: 'white',
                        border: `2px solid ${colors.secondary}`
                    }}
                >
                    Update Health Info
                </button>
                
                {isEdit && (
                    <button 
                        onClick={() => {
                            setIsEdit(false)
                            setImage(false)
                            loadUserProfileData()
                        }} 
                        className='px-8 py-3 rounded-full font-medium transition-all shadow-sm hover:shadow-md'
                        style={{ 
                            backgroundColor: 'white', 
                            color: colors.textLight,
                            border: `2px solid ${colors.border}`
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
            
            {/* Health Information Modal */}
            {showHealthForm && (
                <PatientsInfo onClose={() => setShowHealthForm(false)} />
            )}
        </div>
    ) : null
}

export default MyProfile