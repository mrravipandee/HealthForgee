import { useContext, useEffect } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { Home, Calendar, User } from 'lucide-react'
import DoctorHome from './doctor/DoctorHome'
import DoctorAppointments from './doctor/DoctorAppointments'
import DoctorProfile from './doctor/DoctorProfile'

const DoctorDashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { dToken, profileData, getProfileData } = useContext(DoctorContext)

    useEffect(() => {
        if (!dToken) {
            navigate('/doctor-login')
        } else {
            getProfileData()
            if (location.pathname === '/doctor' || location.pathname === '/doctor/') {
                navigate('/doctor/dashboard')
            }
        }
    }, [dToken, navigate, getProfileData, location.pathname])

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
        { icon: User, label: 'Profile', path: '/doctor/profile' }
    ]

    const currentPath = location.pathname

    if (!dToken) {
        return null
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-7xl mx-auto px-4'>
                {profileData && (
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
                        <div className='flex items-center gap-4'>
                            <img 
                                src={profileData.image} 
                                alt={profileData.name}
                                className='w-16 h-16 rounded-full object-cover'
                            />
                            <div>
                                <h1 className='text-2xl font-bold text-gray-800'>{profileData.name}</h1>
                                <p className='text-blue-600 font-medium'>{profileData.speciality}</p>
                                <p className='text-gray-600'>{profileData.experience} years experience</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
                    <div className='flex border-b border-gray-200'>
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = currentPath === item.path
                            
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                                        isActive 
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className='w-5 h-5' />
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>

                    <div className='p-0'>
                        <Routes>
                            <Route path="/dashboard" element={<DoctorHome />} />
                            <Route path="/appointments" element={<DoctorAppointments />} />
                            <Route path="/profile" element={<DoctorProfile />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
