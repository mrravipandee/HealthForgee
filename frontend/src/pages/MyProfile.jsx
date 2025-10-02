import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import PatientsInfo from '../components/PatientsInfo'
import { Smartphone, Mail, Phone, Ruler, AlertTriangle, User, Calendar, Heart, Weight, Droplet, HeartPlus, PencilIcon } from 'lucide-react'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [showHealthForm, setShowHealthForm] = useState(false)
    const [showOtherMedical, setShowOtherMedical] = useState(false)
    const [showOtherActivity, setShowOtherActivity] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Initialize userData with default structure if it doesn't exist
    useEffect(() => {
        if (token && !userData) {
            loadUserProfileData()
        }
    }, [token, userData, loadUserProfileData])

    // Check if we need to show "Other" text fields
    useEffect(() => {
        if (userData) {
            setShowOtherMedical(userData.medicalCondition === 'Other')
            setShowOtherActivity(userData.activityLevel === 'Other')
        }
    }, [userData])

    // Ensure userData has default structure matching schema
    const safeUserData = userData || {
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: 'Prefer Not To Say',
        image: '',
        weight: '',
        height: '',
        bloodType: 'UNKNOWN',
        activityLevel: 'Sedentary',
        medicalCondition: 'None',
        allergies: '',
        emergencyContact: '',
        otherMedicalCondition: '',
        otherActivityLevel: ''
    }

    // Color scheme
    const colors = {
        primary: '#252C62',
        primaryLight: '#dbeafe',
        primaryDark: '#1d4ed8',
        secondary: '#577cff',
        secondaryLight: '#ede9fe',
        accent: '#10b981',
        accentLight: '#d1fae5',
        textDark: '#1f2937',
        textLight: '#6b7280',
        border: '#e5e7eb',
        background: '#f8fafc'
    }

    // Handle medical condition change
    const handleMedicalConditionChange = (e) => {
        const value = e.target.value
        setUserData(prev => ({ 
            ...prev, 
            medicalCondition: value 
        }))
        setShowOtherMedical(value === 'Other')
    }

    // Handle activity level change
    const handleActivityLevelChange = (e) => {
        const value = e.target.value
        setUserData(prev => ({ 
            ...prev, 
            activityLevel: value 
        }))
        setShowOtherActivity(value === 'Other')
    }

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            // Debug: Log the data we're about to send
            console.log('safeUserData:', safeUserData);
            console.log('Sending data:', {
                userId: safeUserData._id || safeUserData.id,
                name: safeUserData.name || '',
                phone: safeUserData.phone || '',
                age: safeUserData.age || '',
                gender: safeUserData.gender || 'Prefer Not To Say'
            });

            const formData = new FormData();
            formData.append('userId', safeUserData._id || safeUserData.id)
            formData.append('name', safeUserData.name || '')
            formData.append('phone', safeUserData.phone || '')
            formData.append('age', safeUserData.age || '')
            formData.append('gender', safeUserData.gender || 'Prefer Not To Say')
            formData.append('weight', safeUserData.weight || '')
            formData.append('height', safeUserData.height || '')
            formData.append('bloodType', safeUserData.bloodType || 'UNKNOWN')
            formData.append('activityLevel', safeUserData.activityLevel || 'Sedentary')
            formData.append('medicalCondition', safeUserData.medicalCondition || 'None')
            formData.append('allergies', safeUserData.allergies || '')
            formData.append('emergencyContact', safeUserData.emergencyContact || '')
            formData.append('otherMedicalCondition', safeUserData.otherMedicalCondition || '')
            formData.append('otherActivityLevel', safeUserData.otherActivityLevel || '')
            
            if (image) formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                } 
            })

            if (data.success) {
                toast.success('Profile updated successfully!')
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // Display value for medical condition
    const displayMedicalCondition = () => {
        if (safeUserData.medicalCondition === 'Other' && safeUserData.otherMedicalCondition) {
            return safeUserData.otherMedicalCondition
        }
        return safeUserData.medicalCondition || 'None'
    }

    // Display value for activity level
    const displayActivityLevel = () => {
        if (safeUserData.activityLevel === 'Other' && safeUserData.otherActivityLevel) {
            return safeUserData.otherActivityLevel
        }
        return safeUserData.activityLevel || 'Sedentary'
    }

    return userData ? (
        <div className='max-w-4xl flex flex-col gap-6 pt-5 mx-auto px-4' style={{ color: colors.textDark }}>

            {/* Profile Header Section */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl shadow-sm' 
                 style={{ 
                     backgroundColor: colors.primaryLight, 
                     border: `1px solid ${colors.border}`,
                     background: `linear-gradient(135deg, ${colors.primaryLight} 0%, #f0f9ff 100%)`
                 }}>
                {isEdit ? (
                    <label htmlFor='image' className='cursor-pointer group'>
                        <div className='inline-block relative'>
                            <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105' 
                                 src={image ? URL.createObjectURL(image) : (safeUserData.image || assets.profile_pic)} alt="Profile" />
                            <div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <div className='bg-white rounded-full p-2 shadow-lg'>
                                    <img className='w-6' src={assets.upload_icon} alt="Upload" />
                                </div>
                            </div>
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                    </label>
                ) : (
                    <div className='relative'>
                        <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' 
                             src={safeUserData.image || assets.profile_pic} alt="Profile" />
                    </div>
                )}

                <div className='flex-1'>
                    {isEdit ? (
                        <input className='text-3xl font-bold mb-3 px-4 py-2 rounded-lg border-2 w-full max-w-md transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                               style={{ 
                                   backgroundColor: 'white', 
                                   borderColor: colors.border,
                               }}
                               type="text" 
                               onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                               value={safeUserData.name || ''} />
                    ) : (
                        <div>
                            <p className='font-bold text-3xl mb-2' style={{ color: colors.primary }}>{safeUserData.name || 'No Name'}</p>
                            {/* <div className='flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-sm font-medium' style={{ color: colors.textLight }}>Active</span>
                            </div> */}
                        </div>
                    )}
                    <p className='text-lg mt-3 flex items-center gap-2'>
                        <span style={{ color: colors.textLight }}>{safeUserData.email || 'No Email'}</span>
                    </p>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border' style={{ borderColor: colors.border }}>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.primaryLight }}>
                        <Smartphone size={16} style={{ color: colors.primary }} />
                    </div>
                    <p className='font-semibold text-xl' style={{ color: colors.primary }}>
                        CONTACT INFORMATION
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <p className='font-medium mb-2 flex items-center gap-2' style={{ color: colors.textDark }}>
                                <Mail size={16} /> Email ID
                            </p>
                            <p className='text-blue-600 font-medium'>{safeUserData.email || 'Not provided'}</p>
                        </div>
                        <div>
                            <p className='font-medium mb-2 flex items-center gap-2' style={{ color: colors.textDark }}>
                                <Phone size={16} /> Phone Number
                            </p>
                            {isEdit ? (
                                <input className='w-full px-4 py-3 rounded-lg border-2 transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                       style={{ borderColor: colors.border }}
                                       type="text" 
                                       placeholder="Enter phone number"
                                       onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                       value={safeUserData.phone || ''} />
                            ) : (
                                <p className='font-medium' style={{ color: colors.primary }}>{safeUserData.phone || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <p className='font-medium mb-2 flex items-center gap-2' style={{ color: colors.textDark }}>
                                <AlertTriangle size={16} /> Emergency Contact
                            </p>
                            {isEdit ? (
                                <input className='w-full px-4 py-3 rounded-lg border-2 transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                       style={{ borderColor: colors.border }}
                                       type="text" 
                                       placeholder="Emergency contact number"
                                       onChange={(e) => setUserData(prev => ({ ...prev, emergencyContact: e.target.value }))} 
                                       value={safeUserData.emergencyContact || ''} />
                            ) : (
                                <p className='font-medium' style={{ color: colors.textLight }}>{safeUserData.emergencyContact || 'Not provided'}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Information Section */}
            <div className='bg-white p-8 rounded-2xl shadow-sm border' style={{ borderColor: colors.border }}>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.primaryLight }}>
                        <User size={16} style={{ color: colors.primary }} />
                    </div>
                    <p className='font-semibold text-xl' style={{ color: colors.primary }}>
                        BASIC INFORMATION
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                        <div>
                            <p className='font-medium mb-2' style={{ color: colors.textDark }}>Gender</p>
                            {isEdit ? (
                                <select className='w-full px-4 py-3 rounded-lg border-2 transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                        style={{ borderColor: colors.border }}
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                        value={safeUserData.gender || 'Prefer Not To Say'}>
                                    <option value="Prefer Not To Say">Prefer Not To Say</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.primaryLight }}>
                                        <User size={20} style={{ color: colors.primary }} />
                                    </div>
                                    <p className='font-medium' style={{ color: colors.textLight }}>{safeUserData.gender || 'Not provided'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div>
                            <p className='font-medium mb-2' style={{ color: colors.textDark }}>Age</p>
                            {isEdit ? (
                                <input className='w-full px-4 py-3 rounded-lg border-2 transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                       style={{ borderColor: colors.border }}
                                       type='text' 
                                       placeholder="e.g., 25 years"
                                       onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))} 
                                       value={safeUserData.age || ''} />
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.primaryLight }}>
                                        <Calendar size={20} style={{ color: colors.primary }} />
                                    </div>
                                    <p className='font-medium' style={{ color: colors.textLight }}>{safeUserData.age || 'Not provided'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Health Information Section */}
            <div className='p-8 rounded-2xl border' style={{ 
                backgroundColor: colors.primaryLight, 
                borderColor: colors.primary,
                background: `linear-gradient(135deg, ${colors.primaryLight} 0%, #f0f9ff 100%)`
            }}>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.primary }}>
                        <span style={{ color: 'white' }}><Heart size={16} /></span>
                    </div>
                    <p className='font-semibold text-xl' style={{ color: colors.primaryDark }}>
                        HEALTH INFORMATION
                    </p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Physical Stats Card */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md' style={{ borderColor: colors.border }}>
                        <div className='flex items-center gap-3 mb-4'>
                            <p className='font-semibold text-lg' style={{ color: colors.primary }}>Physical Stats</p>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium flex items-center gap-2' style={{ color: colors.textDark }}>
                                    <Ruler size={16} /> Height
                                </span>
                                {isEdit ? (
                                    <input className='w-32 px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                           style={{ borderColor: colors.border }}
                                           type="text" 
                                           placeholder="e.g., 5'9&quot;"
                                           onChange={(e) => setUserData(prev => ({ ...prev, height: e.target.value }))} 
                                           value={safeUserData.height || ''} />
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.primary }}>
                                        {safeUserData.height || 'Not provided'}
                                    </span>
                                )}
                            </div>
                            <div className='flex justify-between items-center py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium flex items-center gap-2' style={{ color: colors.textDark }}>
                                    <span><Weight size={16} /></span> Weight
                                </span>
                                {isEdit ? (
                                    <input className='w-32 px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                           style={{ borderColor: colors.border }}
                                           type="text" 
                                           placeholder="e.g., 70 kg"
                                           onChange={(e) => setUserData(prev => ({ ...prev, weight: e.target.value }))} 
                                           value={safeUserData.weight || ''} />
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.primary }}>
                                        {safeUserData.weight || 'Not provided'}
                                    </span>
                                )}
                            </div>
                            <div className='flex justify-between items-center py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium flex items-center gap-2' style={{ color: colors.textDark }}>
                                    <span><Droplet size={16} /></span> Blood Type
                                </span>
                                {isEdit ? (
                                    <input className='w-32 px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                           style={{ borderColor: colors.border }}
                                           type="text" 
                                           placeholder="e.g., O+"
                                           onChange={(e) => setUserData(prev => ({ ...prev, bloodType: e.target.value }))} 
                                           value={safeUserData.bloodType || ''} />
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.primary }}>
                                        {safeUserData.bloodType || 'UNKNOWN'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Medical Information Card */}
                    <div className='bg-white p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md' style={{ borderColor: colors.border }}>
                        <div className='flex items-center gap-3 mb-4'>
                            <p className='font-semibold text-lg' style={{ color: colors.primary }}>Medical Information</p>
                        </div>
                        <div className='space-y-4'>
                            <div className='py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium block mb-2' style={{ color: colors.textDark }}>Medical Condition</span>
                                {isEdit ? (
                                    <div className='space-y-3'>
                                        <select className='w-full px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                                style={{ borderColor: colors.border }}
                                                onChange={handleMedicalConditionChange} 
                                                value={safeUserData.medicalCondition || 'None'}>
                                            <option value="None">None</option>
                                            <option value="Diabetes">Diabetes</option>
                                            <option value="Hypertension">Hypertension</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {showOtherMedical && (
                                            <input className='w-full px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                                   style={{ borderColor: colors.border }}
                                                   type="text" 
                                                   placeholder="Specify medical condition"
                                                   onChange={(e) => setUserData(prev => ({ ...prev, otherMedicalCondition: e.target.value }))} 
                                                   value={safeUserData.otherMedicalCondition || ''} />
                                        )}
                                    </div>
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.primary }}>
                                        {displayMedicalCondition()}
                                    </span>
                                )}
                            </div>
                            <div className='py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium block mb-2' style={{ color: colors.textDark }}>Allergies</span>
                                {isEdit ? (
                                    <textarea className='w-full px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                              style={{ borderColor: colors.border, minHeight: '80px' }}
                                              placeholder="List any allergies, separated by commas..."
                                              onChange={(e) => setUserData(prev => ({ ...prev, allergies: e.target.value }))} 
                                              value={safeUserData.allergies || ''} />
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.primary }}>
                                        {safeUserData.allergies || 'None reported'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lifestyle Information Section */}
            <div className='p-8 rounded-2xl border' style={{ 
                backgroundColor: colors.secondaryLight, 
                borderColor: colors.secondary,
                background: `linear-gradient(135deg, ${colors.secondaryLight} 0%, #faf5ff 100%)`
            }}>
                <div className='flex items-center gap-3 mb-6'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center' style={{ backgroundColor: colors.secondary }}>
                        <span style={{ color: 'white' }}><HeartPlus size={16} /></span>
                    </div>
                    <p className='font-semibold text-xl' style={{ color: colors.secondary }}>
                        LIFESTYLE INFORMATION
                    </p>
                </div>
                <div className='grid grid-cols-1 gap-6'>
                    <div className='bg-white p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md' style={{ borderColor: colors.border }}>
                        <div className='flex items-center gap-3 mb-4'>
                            <p className='font-semibold text-lg' style={{ color: colors.secondary }}>Activity & Health</p>
                        </div>
                        <div className='space-y-4'>
                            <div className='py-3 px-4 rounded-lg' style={{ backgroundColor: colors.background }}>
                                <span className='font-medium block mb-2' style={{ color: colors.textDark }}>Activity Level</span>
                                {isEdit ? (
                                    <div className='space-y-3'>
                                        <select className='w-full px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                                style={{ borderColor: colors.border }}
                                                onChange={handleActivityLevelChange} 
                                                value={safeUserData.activityLevel || 'Sedentary'}>
                                            <option value="Sedentary">Sedentary</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Active">Active</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {showOtherActivity && (
                                            <input className='w-full px-3 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                                   style={{ borderColor: colors.border }}
                                                   type="text" 
                                                   placeholder="Specify activity level"
                                                   onChange={(e) => setUserData(prev => ({ ...prev, otherActivityLevel: e.target.value }))} 
                                                   value={safeUserData.otherActivityLevel || ''} />
                                        )}
                                    </div>
                                ) : (
                                    <span className='font-semibold' style={{ color: colors.secondary }}>
                                        {displayActivityLevel()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-4 mt-6 p-8 bg-white rounded-2xl border shadow-sm' style={{ borderColor: colors.border }}>
                {isEdit ? (
                    <>
                        <button 
                            onClick={updateUserProfileData} 
                            className='px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 flex items-center gap-2'
                            style={{ 
                                backgroundColor: colors.primary, 
                                color: 'white',
                                border: `2px solid ${colors.primary}`
                            }}
                        >
                            <span>💾</span> Save All Information
                        </button>
                        <button 
                            onClick={() => {
                                setIsEdit(false)
                                setImage(false)
                                loadUserProfileData()
                            }} 
                            className='px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 flex items-center gap-2'
                            style={{ 
                                backgroundColor: 'white', 
                                color: colors.textLight,
                                border: `2px solid ${colors.border}`
                            }}
                        >
                            <span>❌</span> Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={() => setIsEdit(true)} 
                            className='px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 flex items-center gap-2'
                            style={{ 
                                backgroundColor: 'white', 
                                color: colors.primary,
                                border: `2px solid ${colors.primary}`
                            }}
                        >
                            <span><PencilIcon size={16} /></span> Edit Profile
                        </button>
                        
                        <button 
                            onClick={() => setShowHealthForm(true)} 
                            className='px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 flex items-center gap-2'
                            style={{ 
                                backgroundColor: colors.primary, 
                                color: 'white',
                                border: `2px solid ${colors.primary}`
                            }}
                        >
                            <span><Heart size={16} /></span> Update Health Info
                        </button>
                    </>
                )}
            </div>
            
            {/* Health Information Modal */}
            {showHealthForm && (
                <PatientsInfo onClose={() => setShowHealthForm(false)} />
            )}
        </div>
    ) : (
        <div className='max-w-4xl mx-auto px-4 pt-20'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p className='text-gray-600 text-lg'>Loading your profile...</p>
            </div>
        </div>
    )
}

export default MyProfile;