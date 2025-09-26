import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const handleInputChange = (setter) => (e) => {
        const { value } = e.target;
        setter(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    };

    const onchangeHandler = (event) => {
        const { name, value } = event.target
        setUserData(prev => ({ ...prev, [name]: value }))
    }

    // Function to update user profile data using API
    const updateUserProfileData = async (e) => {
        e.preventDefault()
        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            formData.append('whatsapp', userData.whatsapp)
            formData.append('bloodGroup', userData.bloodGroup)
            formData.append('aadhar', userData.aadhar)
            formData.append('allergies', userData.allergies)

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

    useEffect(() => {
        if (!isEdit && userData) {
            // Optional: revert changes if the user cancels editing
        }
    }, [isEdit, userData])

    return userData ? (
        <form onSubmit={updateUserProfileData} className='m-5 w-full font-poppins'>
            <div className='bg-white px-8 py-8 border rounded-lg shadow-md w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor='image' >
                        <div className='inline-block relative cursor-pointer'>
                            <img className='w-36 h-36 rounded-full object-cover opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                            {isEdit && <img className='w-10 absolute bottom-12 right-12' src={assets.upload_icon} alt="" />}
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden disabled={!isEdit} />
                    </label>
                    <p className='uppercase font-semibold text-[#003366]'>Profile Image</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Full Name</p>
                        <input name='name' onChange={handleInputChange((value) => setUserData(prev => ({ ...prev, name: value })))} value={userData.name} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='Full Name' required disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Email</p>
                        <input name='email' value={userData.email} className='border rounded-md px-3 py-2 w-full shadow-sm bg-gray-100' type="email" placeholder='Email' disabled />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Address</p>
                        <input name='address1' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} className='border rounded-md px-3 py-2 w-full shadow-sm mb-2' type="text" placeholder='Address Line 1' required disabled={!isEdit} />
                        <input name='address2' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='Address Line 2' disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Contact No</p>
                        <input name='phone' onChange={onchangeHandler} value={userData.phone} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='Contact No' required disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Age</p>
                        <input name='age' onChange={onchangeHandler} value={userData.age || ''} className='border rounded-md px-3 py-2 w-full shadow-sm' type="number" placeholder='Age' required disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Birthdate</p>
                        <input name='dob' onChange={onchangeHandler} value={userData.dob} className='border rounded-md px-3 py-2 w-full shadow-sm' type="date" required disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Gender</p>
                        <select name='gender' onChange={onchangeHandler} value={userData.gender} className='border rounded-md px-3 py-2 w-full shadow-sm' required disabled={!isEdit}>
                            <option value="Not Selected">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>WhatsApp No (Optional)</p>
                        <input name='whatsapp' onChange={onchangeHandler} value={userData.whatsapp || ''} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='WhatsApp No' disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Blood Group (Optional)</p>
                        <input name='bloodGroup' onChange={onchangeHandler} value={userData.bloodGroup || ''} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='Blood Group' disabled={!isEdit} />
                    </div>
                    <div>
                        <p className='uppercase font-semibold text-[#003366]'>Aadhar No (Optional)</p>
                        <input name='aadhar' onChange={onchangeHandler} value={userData.aadhar || ''} className='border rounded-md px-3 py-2 w-full shadow-sm' type="text" placeholder='Aadhar No' disabled={!isEdit} />
                    </div>
                    <div className='md:col-span-2'>
                        <p className='uppercase font-semibold text-[#003366]'>Allergies (Optional)</p>
                        <textarea name='allergies' onChange={onchangeHandler} value={userData.allergies || ''} className='border rounded-md px-3 py-2 w-full shadow-sm' rows="3" placeholder='List any allergies' disabled={!isEdit}></textarea>
                    </div>
                </div>

                <div className='flex justify-center gap-4 mt-10'>
                    {isEdit ? (
                        <button type='submit' className='bg-[#003366] px-10 py-3 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors'>Submit</button>
                    ) : (
                        <button type='button' onClick={() => setIsEdit(true)} className='bg-gray-200 px-10 py-3 text-gray-800 rounded-full shadow-md hover:bg-gray-300 transition-colors'>Edit</button>
                    )}
                </div>
            </div>
        </form>
    ) : null
}

export default MyProfile
