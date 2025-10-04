'use client';

import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, User, Stethoscope, Eye, EyeOff, ArrowLeft } from 'lucide-react'

const DoctorLogin = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            console.log('Doctor login attempt:', { email })
            
            const { data } = await axios.post(backendUrl + '/api/doctor/login', { 
                email: email.toLowerCase().trim(), 
                password 
            })
            
            console.log('Login response:', data)
            
            if (data.success) {
                // Store the token
                localStorage.setItem('dToken', data.token)
                toast.success('Login successful!')
                
                // Redirect to doctor dashboard
                setTimeout(() => {
                    router.push('/doctor/dashboard')
                }, 1000)
            } else {
                toast.error(data.message || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
                <div className='absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse' style={{animationDelay: '2000ms'}}></div>
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse' style={{animationDelay: '4000ms'}}></div>
            </div>

            {/* Back to Home Button */}
            <div className='absolute top-6 left-6 z-10'>
                <Link
                    href="/"
                    className='flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200'
                >
                    <ArrowLeft className='w-4 h-4' />
                    <span>Back to Home</span>
                </Link>
            </div>

            <div className='min-h-screen flex items-center justify-center px-4 relative z-20'>
                <div className='w-full max-w-lg'>
                    {/* Header with Logo */}
                    <div className='text-center mb-8'>
                        <div className='flex justify-center mb-6'>
                            <div className='relative'>
                                <div className='w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-xl'>
                                    <Stethoscope className='w-10 h-10 text-white' />
                                </div>
                                <div className='absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white'></div>
                            </div>
                        </div>
                        <h1 className='text-4xl font-bold text-gray-900 mb-3'>Doctor Portal</h1>
                        <p className='text-lg text-gray-600'>Welcome back, Doctor!</p>
                        <p className='text-sm text-gray-500 mt-1'>Please sign in to access your dashboard</p>
                    </div>

                    {/* Login Card */}
                    <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8'>
                        <form onSubmit={onSubmitHandler} className='space-y-6'>
                            {/* Email Field */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Email Address
                                </label>
                                <div className='relative group'>
                                    <Mail className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-primary transition-colors' />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white'
                                        placeholder='Enter your email address'
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className='space-y-2'>
                                <label className='block text-sm font-semibold text-gray-700'>
                                    Password
                                </label>
                                <div className='relative group'>
                                    <Lock className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 group-focus-within:text-primary transition-colors' />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 bg-gray-50 focus:bg-white'
                                        placeholder='Enter your password'
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                                    >
                                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className='text-right'>
                                <Link
                                    href="/doctor/forgot-password"
                                    className='text-sm text-primary hover:text-secondary font-medium hover:underline transition-colors'
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className='w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                            >
                                {isLoading ? (
                                    <div className='flex items-center justify-center'>
                                        <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3'></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center'>
                                        <User className='w-5 h-5 mr-2' />
                                        Sign In to Dashboard
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className='my-8 flex items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink-0 px-4 text-gray-500 text-sm'>or</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>

                        {/* Footer Links */}
                        <div className='space-y-4 text-center'>
                            <div className='bg-blue-50 rounded-xl p-4'>
                                <p className='text-sm text-gray-700 mb-2'>
                                    Don&apos;t have a doctor account?
                                </p>
                                <Link
                                    href="/doctor-registration"
                                    className='text-primary hover:text-secondary font-semibold text-sm hover:underline transition-colors'
                                >
                                    Register as a Doctor →
                                </Link>
                            </div>
                            
                            <div className='bg-gray-50 rounded-xl p-4'>
                                <p className='text-sm text-gray-700 mb-2'>
                                    Are you a patient looking for care?
                                </p>
                                <Link
                                    href="/login"
                                    className='text-green-600 hover:text-green-800 font-semibold text-sm hover:underline transition-colors'
                                >
                                    Patient Login →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className='mt-8 text-center'>
                        <div className='flex items-center justify-center space-x-6 text-sm text-gray-500'>
                            <div className='flex items-center space-x-1'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span>Secure Login</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <div className='w-2 h-2 bg-primary rounded-full'></div>
                                <span>HIPAA Compliant</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <div className='w-2 h-2 bg-secondary rounded-full'></div>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorLogin