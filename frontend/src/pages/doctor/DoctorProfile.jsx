import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { User, Mail, GraduationCap, Clock, DollarSign, MapPin, Edit, Save, X } from 'lucide-react'

const DoctorProfile = () => {
    const { dToken, profileData, getProfileData, updateProfile } = useContext(DoctorContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken, getProfileData])

    useEffect(() => {
        if (profileData) {
            setEditData({
                name: profileData.name || '',
                email: profileData.email || '',
                experience: profileData.experience || '',
                fees: profileData.fees || '',
                about: profileData.about || '',
                degree: profileData.degree || '',
                speciality: profileData.speciality || '',
                address: profileData.address || { line1: '', line2: '' },
                available: profileData.available !== undefined ? profileData.available : true
            })
        }
    }, [profileData])

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.')
            setEditData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setEditData(prev => ({
                ...prev,
                [field]: value
            }))
        }
    }

    const handleSave = async () => {
        await updateProfile(editData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditData({
            name: profileData.name || '',
            email: profileData.email || '',
            experience: profileData.experience || '',
            fees: profileData.fees || '',
            about: profileData.about || '',
            degree: profileData.degree || '',
            speciality: profileData.speciality || '',
            address: profileData.address || { line1: '', line2: '' },
            available: profileData.available !== undefined ? profileData.available : true
        })
        setIsEditing(false)
    }

    if (!profileData) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <User className='w-6 h-6 text-blue-600' />
                    <h1 className='text-2xl font-bold text-gray-800'>Doctor Profile</h1>
                </div>
                <div className='flex gap-2'>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                            >
                                <Save className='w-4 h-4' />
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
                            >
                                <X className='w-4 h-4' />
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            <Edit className='w-4 h-4' />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Profile Image & Basic Info */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                    <div className='text-center'>
                        <img 
                            src={profileData.image || '/api/placeholder/150/150'} 
                            alt={profileData.name}
                            className='w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100'
                        />
                        <h2 className='text-xl font-bold text-gray-800 mb-2'>{profileData.name}</h2>
                        <p className='text-blue-600 font-medium mb-4'>{profileData.speciality}</p>
                        
                        {/* Availability Toggle */}
                        <div className='mb-4'>
                            <label className='flex items-center justify-center gap-2 cursor-pointer'>
                                <span className='text-sm font-medium text-gray-700'>Available for appointments</span>
                                <div className='relative'>
                                    <input
                                        type="checkbox"
                                        checked={isEditing ? editData.available : profileData.available}
                                        onChange={(e) => isEditing && handleInputChange('available', e.target.checked)}
                                        disabled={!isEditing}
                                        className='sr-only'
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors ${
                                        (isEditing ? editData.available : profileData.available)
                                            ? 'bg-green-500' 
                                            : 'bg-gray-300'
                                    }`}>
                                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                            (isEditing ? editData.available : profileData.available)
                                                ? 'translate-x-5' 
                                                : 'translate-x-0.5'
                                        } mt-0.5`}></div>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            (isEditing ? editData.available : profileData.available)
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {(isEditing ? editData.available : profileData.available) ? 'Available' : 'Unavailable'}
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Basic Information */}
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Basic Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    <Mail className='w-4 h-4 inline mr-2' />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                ) : (
                                    <p className='text-gray-800'>{profileData.name}</p>
                                )}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    <Mail className='w-4 h-4 inline mr-2' />
                                    Email
                                </label>
                                <p className='text-gray-800'>{profileData.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Professional Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    <GraduationCap className='w-4 h-4 inline mr-2' />
                                    Degree
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.degree}
                                        onChange={(e) => handleInputChange('degree', e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                ) : (
                                    <p className='text-gray-800'>{profileData.degree}</p>
                                )}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Speciality
                                </label>
                                {isEditing ? (
                                    <select
                                        value={editData.speciality}
                                        onChange={(e) => handleInputChange('speciality', e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    >
                                        <option value="General physician">General physician</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Pediatricians">Pediatricians</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Gastroenterologist">Gastroenterologist</option>
                                    </select>
                                ) : (
                                    <p className='text-gray-800'>{profileData.speciality}</p>
                                )}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    <Clock className='w-4 h-4 inline mr-2' />
                                    Experience
                                </label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editData.experience}
                                        onChange={(e) => handleInputChange('experience', e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                ) : (
                                    <p className='text-gray-800'>{profileData.experience} years</p>
                                )}
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    <DollarSign className='w-4 h-4 inline mr-2' />
                                    Consultation Fee
                                </label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editData.fees}
                                        onChange={(e) => handleInputChange('fees', e.target.value)}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                ) : (
                                    <p className='text-gray-800'>₹{profileData.fees}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* About & Address */}
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4'>About & Address</h3>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>About</label>
                                {isEditing ? (
                                    <textarea
                                        value={editData.about}
                                        onChange={(e) => handleInputChange('about', e.target.value)}
                                        rows={3}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    />
                                ) : (
                                    <p className='text-gray-800'>{profileData.about}</p>
                                )}
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        <MapPin className='w-4 h-4 inline mr-2' />
                                        Address Line 1
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.address?.line1 || ''}
                                            onChange={(e) => handleInputChange('address.line1', e.target.value)}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        />
                                    ) : (
                                        <p className='text-gray-800'>{profileData.address?.line1}</p>
                                    )}
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Address Line 2</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.address?.line2 || ''}
                                            onChange={(e) => handleInputChange('address.line2', e.target.value)}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        />
                                    ) : (
                                        <p className='text-gray-800'>{profileData.address?.line2}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile