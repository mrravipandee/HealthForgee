import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const handleInputChange = (setter) => (e) => {
        const { value } = e.target;
        setter(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            // console log formdata            
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full font-poppins'>

            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white px-8 py-8 border rounded-lg shadow-md w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
                    <p className='uppercase font-semibold text-[#003366]'>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Your name</p>
                            <input onChange={handleInputChange(setName)} value={name} className='border rounded-md px-3 py-2 shadow-sm' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Doctor Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded-md px-3 py-2 shadow-sm' type="email" placeholder='Email' required />
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Set Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded-md px-3 py-2 shadow-sm' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded-md px-2 py-2 shadow-sm' >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Fees</p>
                            <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded-md px-3 py-2 shadow-sm' type="number" placeholder='Doctor fees' required />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded-md px-2 py-2 shadow-sm'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>


                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Degree</p>
                            <input onChange={handleInputChange(setDegree)} value={degree} className='border rounded-md px-3 py-2 shadow-sm' type="text" placeholder='Degree' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p className='uppercase font-semibold text-[#003366]'>Address</p>
                            <input onChange={handleInputChange(setAddress1)} value={address1} className='border rounded-md px-3 py-2 shadow-sm' type="text" placeholder='Address 1' required />
                            <input onChange={handleInputChange(setAddress2)} value={address2} className='border rounded-md px-3 py-2 shadow-sm' type="text" placeholder='Address 2' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='uppercase font-semibold text-[#003366] mt-4 mb-2'>About Doctor</p>
                    <textarea onChange={handleInputChange(setAbout)} value={about} className='w-full px-4 pt-2 border rounded-md shadow-sm' rows={5} placeholder='write about doctor'></textarea>
                </div>

                <div className='flex justify-center'>
                    <button type='submit' className='bg-[#003366] px-10 py-3 mt-4 text-white rounded-full shadow-md hover:bg-blue-800 transition-colors'>Add doctor</button>
                </div>

            </div>


        </form>
    )
}

export default AddDoctor