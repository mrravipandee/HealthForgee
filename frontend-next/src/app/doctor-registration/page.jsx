'use client';

import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { User, Mail, Phone, GraduationCap, MapPin, DollarSign, Upload, Clock, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DoctorRegistration = () => {
    const router = useRouter()
    const [docImg, setDocImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        experience: '',
        fees: '',
        about: '',
        degree: '',
        speciality: 'General physician',
        address1: '',
        address2: ''
    })

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const specialityData = [
        'General physician',
        'Gynecologist',
        'Dermatologist',
        'Pediatricians',
        'Neurologist',
        'Gastroenterologist'
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            // Frontend validations
            if (!docImg) {
                return toast.error('Doctor image is required')
            }

            if (!formData.name.trim()) {
                return toast.error('Doctor name is required')
            }

            if (!formData.email.trim()) {
                return toast.error('Email is required')
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                return toast.error('Please enter a valid email address')
            }

            if (formData.password.length < 8) {
                return toast.error('Password must be at least 8 characters long')
            }

            if (!formData.experience || isNaN(formData.experience) || formData.experience < 0) {
                return toast.error('Please enter valid years of experience')
            }

            if (!formData.fees || isNaN(formData.fees) || formData.fees < 0) {
                return toast.error('Please enter valid consultation fees')
            }

            if (!formData.degree.trim()) {
                return toast.error('Degree information is required')
            }

            if (!formData.about.trim() || formData.about.length < 50) {
                return toast.error('Please provide a detailed description (at least 50 characters)')
            }

            if (!formData.address1.trim() || !formData.address2.trim()) {
                return toast.error('Both address lines are required')
            }

            const formDataToSend = new FormData()
            formDataToSend.append('image', docImg)
            formDataToSend.append('name', formData.name.trim())
            formDataToSend.append('email', formData.email.toLowerCase().trim())
            formDataToSend.append('password', formData.password)
            formDataToSend.append('experience', formData.experience)
            formDataToSend.append('fees', formData.fees)
            formDataToSend.append('about', formData.about.trim())
            formDataToSend.append('speciality', formData.speciality)
            formDataToSend.append('degree', formData.degree.trim())
            formDataToSend.append('address', JSON.stringify({
                line1: formData.address1.trim(),
                line2: formData.address2.trim()
            }))

            console.log('Submitting doctor registration...')
            console.log('Backend URL:', backendUrl)

            const { data } = await axios.post(backendUrl + '/api/doctor/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            console.log('Registration response:', data)
            
            if (data.success) {
                toast.success(data.message || 'Doctor registered successfully!')
                
                // Store the token if provided (auto-login)
                if (data.token) {
                    localStorage.setItem('dToken', data.token)
                    toast.success('You are now logged in!')
                    
                    // Redirect to doctor dashboard or home page
                    setTimeout(() => {
                        router.push('/doctor/dashboard')
                    }, 2000)
                } else {
                    // Reset form if no token (manual login required)
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        experience: '',
                        fees: '',
                        about: '',
                        degree: '',
                        speciality: 'General physician',
                        address1: '',
                        address2: ''
                    })
                    setDocImg(null)
                    
                    // Show login instruction
                    setTimeout(() => {
                        toast.info('You can now login with your email and password')
                    }, 2000)
                }
            } else {
                toast.error(data.message || 'Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error)
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='max-w-4xl mx-auto p-6'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold mb-2 text-primary'>
                        Doctor Registration
                    </h1>
                    <p className='text-lg text-gray-600'>
                        Join our healthcare platform and start helping patients
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-lg p-8 border border-gray-200'>
                    {/* Profile Picture Section */}
                    <div className='mb-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-primary/10'>
                                <User size={16} className="text-primary" />
                            </div>
                            <h2 className='text-xl font-semibold text-primary'>
                                Profile Information
                            </h2>
                        </div>
                        
                        <div className='flex flex-col items-center'>
                            <label htmlFor='doc-img' className='cursor-pointer group'>
                                <div className='relative'>
                                    <img 
                                        className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105' 
                                        src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                        alt="Doctor Profile" 
                                    />
                                    <div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <div className='bg-white rounded-full p-2 shadow-lg'>
                                            <Upload size={20} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" required />
                            <p className='mt-2 text-sm text-gray-500'>Upload doctor&apos;s profile picture</p>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                        <div>
                            <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                <User size={16} /> Doctor Name
                            </label>
                            <input 
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                type="text" 
                                placeholder="Enter doctor's full name"
                                required 
                            />
                        </div>

                        <div>
                            <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                <Mail size={16} /> Email Address
                            </label>
                            <input 
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                type="email" 
                                placeholder="doctor@example.com"
                                required 
                            />
                        </div>

                        <div>
                            <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                <Phone size={16} /> Password
                            </label>
                            <input 
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                type="password" 
                                placeholder="Create strong password"
                                required 
                            />
                        </div>

                        <div>
                            <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                <Clock size={16} /> Experience (Years)
                            </label>
                            <input 
                                name='experience'
                                value={formData.experience}
                                onChange={handleChange}
                                className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                type="number" 
                                placeholder="e.g., 5"
                                min="0"
                                required 
                            />
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className='mb-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-primary/10'>
                                <GraduationCap size={16} className="text-primary" />
                            </div>
                            <h2 className='text-xl font-semibold text-primary'>
                                Professional Details
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                    <BookOpen size={16} /> Speciality
                                </label>
                                <select 
                                    name='speciality'
                                    value={formData.speciality}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                    required
                                >
                                    {specialityData.map((speciality, index) => (
                                        <option key={index} value={speciality}>{speciality}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                    <GraduationCap size={16} /> Degree
                                </label>
                                <input 
                                    name='degree'
                                    value={formData.degree}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                    type="text" 
                                    placeholder="e.g., MBBS, MD"
                                    required 
                                />
                            </div>

                            <div>
                                <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                    <DollarSign size={16} /> Consultation Fees
                                </label>
                                <input 
                                    name='fees'
                                    value={formData.fees}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                    type="number" 
                                    placeholder="e.g., 500"
                                    min="0"
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className='mb-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-8 h-8 rounded-full flex items-center justify-center bg-primary/10'>
                                <MapPin size={16} className="text-primary" />
                            </div>
                            <h2 className='text-xl font-semibold text-primary'>
                                Address Details
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                    <MapPin size={16} /> Address Line 1
                                </label>
                                <input 
                                    name='address1'
                                    value={formData.address1}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                    type="text" 
                                    placeholder="Street address"
                                    required 
                                />
                            </div>

                            <div>
                                <label className='flex items-center gap-2 font-medium mb-2 text-gray-800'>
                                    <MapPin size={16} /> Address Line 2
                                </label>
                                <input 
                                    name='address2'
                                    value={formData.address2}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                                    type="text" 
                                    placeholder="City, State, PIN"
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='mb-8'>
                        <label className='font-medium mb-2 block text-gray-800'>
                            About Doctor
                        </label>
                        <textarea 
                            name='about'
                            value={formData.about}
                            onChange={handleChange}
                            className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 transition-all focus:ring-2 focus:ring-primary focus:border-transparent' 
                            style={{ minHeight: '120px' }}
                            placeholder="Write about the doctor's background, expertise, and approach to patient care..."
                            required 
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='text-center'>
                        <button 
                            type='submit' 
                            disabled={isLoading}
                            className={`px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                            style={{ 
                                backgroundColor: 'var(--primary, #3B82F6)', 
                                color: 'white',
                                border: '2px solid var(--primary, #3B82F6)'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                    Registering...
                                </>
                            ) : (
                                <>
                                    <User size={20} />
                                    Register Doctor
                                </>
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className='text-center mt-6'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            <Link
                                href="/doctor-login"
                                className='text-primary hover:text-secondary font-semibold underline transition-colors duration-200'
                            >
                                Login here
                            </Link>
                        </p>
                        <p className='text-gray-600 mt-2'>
                            Are you a patient?{' '}
                            <Link
                                href="/login"
                                className='text-primary hover:text-secondary font-semibold underline transition-colors duration-200'
                            >
                                Patient Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DoctorRegistration