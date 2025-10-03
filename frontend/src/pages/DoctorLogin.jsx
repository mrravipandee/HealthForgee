import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'

const DoctorLogin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

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
                    navigate('/doctor/dashboard')
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
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
            <div className='w-full max-w-md'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='flex justify-center mb-4'>
                        <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
                            <User className='w-8 h-8 text-white' />
                        </div>
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Doctor Login</h1>
                    <p className='text-gray-600'>Access your doctor portal</p>
                </div>

                {/* Login Form */}
                <form onSubmit={onSubmitHandler} className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='space-y-6'>
                        {/* Email Field */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <Lock className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2' />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200'
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center'>
                                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>

                    {/* Footer Links */}
                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>
                            Don&apos;t have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/doctor-registration')}
                                className='text-blue-600 hover:text-blue-800 font-medium'
                            >
                                Register here
                            </button>
                        </p>
                        <p className='text-sm text-gray-600 mt-2'>
                            Are you a patient?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className='text-blue-600 hover:text-blue-800 font-medium'
                            >
                                Patient Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DoctorLogin