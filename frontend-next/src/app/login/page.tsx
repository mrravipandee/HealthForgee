'use client';

import { useEffect, useState } from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { backendUrl, token, setToken, authChecked, userData } = useAppContext()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          console.log('Registration successful, token:', data.token);
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          console.log('Login successful, token:', data.token);
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login successful!')
          // router.push("/patient");
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Only redirect to home after auth check completes and user is loaded
    console.log('Auth state:', { authChecked, token, userData });
    if (authChecked) {
      if (token && userData) {
        console.log('Authenticated - navigating to home');
        router.push('/patient/home')
      }
    }
  }, [authChecked, token, userData, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">HealthCare</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {state === 'Sign Up' ? 'Sign up to book appointments and manage your health' : 'Log in to access your health dashboard'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {state === 'Sign Up' && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                type="text" 
                placeholder="Enter your full name"
                required 
              />
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              type="email" 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              type="password" 
              placeholder="Enter your password"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {state === 'Sign Up' ? 'Creating Account...' : 'Logging in...'}
              </>
            ) : (
              state === 'Sign Up' ? 'Create Account' : 'Login to Account'
            )}
          </button>

          {/* Toggle between Login/Sign Up */}
          <div className="text-center mt-6">
            {state === 'Sign Up' ? (
              <p className="text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setState('Login')} 
                  className="text-primary hover:text-secondary font-semibold transition-colors"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setState('Sign Up')} 
                  className="text-primary hover:text-secondary font-semibold transition-colors"
                >
                  Sign up here
                </button>
              </p>
            )}
          </div>

          {/* Doctor Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Are you a doctor?{' '}
              <Link 
                href="/doctor-login" 
                className="text-primary hover:text-secondary font-semibold transition-colors"
              >
                Doctor Login
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 text-sm text-blue-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Your health data is secure and protected with us</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login