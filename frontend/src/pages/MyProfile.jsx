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
        <div className='max-w-4xl flex flex-col gap-2 text-sm pt-5 mx-auto px-4'>

            {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="" />
            }

            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit
                        ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                        : <p className='text-blue-500'>{userData.phone}</p>
                    }

                    <p className='font-medium'>Address:</p>

                    {isEdit
                        ? <p>
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }

                </div>
            </div>
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {isEdit
                        ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }

                </div>
            </div>

            {/* Health Information Section */}
            <div className='bg-gray-50 p-6 rounded-lg mt-6'>
                <p className='text-[#797979] underline mb-4 text-lg font-semibold'>HEALTH INFORMATION</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='bg-white p-4 rounded-lg shadow-sm'>
                        <p className='font-medium text-gray-700 mb-2'>Physical Stats</p>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Height:</span>
                                <span className='text-gray-800 font-medium'>{userData.height || 'Not provided'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Weight:</span>
                                <span className='text-gray-800 font-medium'>{userData.weight || 'Not provided'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Blood Group:</span>
                                <span className='text-gray-800 font-medium'>{userData.bloodGroup || 'Not selected'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white p-4 rounded-lg shadow-sm'>
                        <p className='font-medium text-gray-700 mb-2'>Medical History</p>
                        <div className='space-y-2 text-sm'>
                            <div>
                                <span className='text-gray-600 block'>Medical Conditions:</span>
                                <span className='text-gray-800'>
                                    {userData.medicalConditions && userData.medicalConditions.length > 0 
                                        ? userData.medicalConditions.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div>
                                <span className='text-gray-600 block'>Current Medications:</span>
                                <span className='text-gray-800'>
                                    {userData.currentMedications && userData.currentMedications.length > 0 
                                        ? userData.currentMedications.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div>
                                <span className='text-gray-600 block'>Allergies:</span>
                                <span className='text-gray-800'>
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
            <div className='bg-blue-50 p-6 rounded-lg mt-6'>
                <p className='text-[#797979] underline mb-4 text-lg font-semibold'>LIFESTYLE INFORMATION</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='bg-white p-4 rounded-lg shadow-sm'>
                        <p className='font-medium text-gray-700 mb-2'>Diet & Nutrition</p>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Diet Preference:</span>
                                <span className='text-gray-800 font-medium'>{userData.dietPreference || 'Not selected'}</span>
                            </div>
                            <div>
                                <span className='text-gray-600 block'>Dietary Restrictions:</span>
                                <span className='text-gray-800'>
                                    {userData.dietaryRestrictions && userData.dietaryRestrictions.length > 0 
                                        ? userData.dietaryRestrictions.join(', ') 
                                        : 'None reported'
                                    }
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Health Goal:</span>
                                <span className='text-gray-800 font-medium'>{userData.healthGoal || 'General Fitness'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white p-4 rounded-lg shadow-sm'>
                        <p className='font-medium text-gray-700 mb-2'>Activity & Habits</p>
                        <div className='space-y-2 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Activity Level:</span>
                                <span className='text-gray-800 font-medium'>{userData.activityLevel || 'Not selected'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Exercise Routine:</span>
                                <span className='text-gray-800 font-medium'>{userData.exerciseRoutine || 'None specified'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Preferred Exercise:</span>
                                <span className='text-gray-800 font-medium'>{userData.preferredExerciseType || 'Not specified'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Sleep Duration:</span>
                                <span className='text-gray-800 font-medium'>{userData.sleepDuration || 'Not specified'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Alcohol/Smoking:</span>
                                <span className='text-gray-800 font-medium'>{userData.alcoholOrSmoking || 'No'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }
                
                {/* Health Information Button */}
                <button 
                    onClick={() => setShowHealthForm(true)} 
                    className='ml-4 border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all'
                >
                    Update Health Info
                </button>
            </div>
            
            {/* Health Information Modal */}
            {showHealthForm && (
                <PatientsInfo onClose={() => setShowHealthForm(false)} />
            )}
        </div>
    ) : null
}

export default MyProfile