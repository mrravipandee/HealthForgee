import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { DollarSign, Calendar, Users, Clock, CheckCircle, XCircle } from 'lucide-react'

const DoctorHome = () => {
    const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken, getDashData])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (!dashData) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                {/* Earnings Card */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                            <DollarSign className='w-6 h-6 text-green-600' />
                        </div>
                        <div>
                            <p className='text-2xl font-bold text-gray-800'>{currency} {dashData.earnings || 0}</p>
                            <p className='text-gray-600'>Total Earnings</p>
                        </div>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                            <Calendar className='w-6 h-6 text-blue-600' />
                        </div>
                        <div>
                            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments || 0}</p>
                            <p className='text-gray-600'>Total Appointments</p>
                        </div>
                    </div>
                </div>

                {/* Patients Card */}
                <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                            <Users className='w-6 h-6 text-purple-600' />
                        </div>
                        <div>
                            <p className='text-2xl font-bold text-gray-800'>{dashData.patients || 0}</p>
                            <p className='text-gray-600'>Total Patients</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Appointments */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
                <div className='p-6 border-b border-gray-200'>
                    <div className='flex items-center gap-3'>
                        <Clock className='w-5 h-5 text-gray-600' />
                        <h2 className='text-lg font-semibold text-gray-800'>Latest Appointments</h2>
                    </div>
                </div>

                <div className='divide-y divide-gray-200'>
                    {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.slice(0, 5).map((appointment, index) => (
                            <div key={index} className='p-6 hover:bg-gray-50 transition-colors'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <img 
                                            src={appointment.userData.image || '/api/placeholder/40/40'} 
                                            alt={appointment.userData.name}
                                            className='w-10 h-10 rounded-full object-cover'
                                        />
                                        <div>
                                            <p className='font-medium text-gray-800'>{appointment.userData.name}</p>
                                            <p className='text-sm text-gray-600'>
                                                {formatDate(appointment.slotDate)} at {appointment.slotTime}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        {appointment.cancelled ? (
                                            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                                                <XCircle className='w-3 h-3 mr-1' />
                                                Cancelled
                                            </span>
                                        ) : appointment.isCompleted ? (
                                            <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                                <CheckCircle className='w-3 h-3 mr-1' />
                                                Completed
                                            </span>
                                        ) : (
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => cancelAppointment(appointment._id)}
                                                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                                    title='Cancel Appointment'
                                                >
                                                    <XCircle className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => completeAppointment(appointment._id)}
                                                    className='p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                                                    title='Complete Appointment'
                                                >
                                                    <CheckCircle className='w-4 h-4' />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='p-8 text-center text-gray-500'>
                            <Calendar className='w-12 h-12 mx-auto mb-4 text-gray-300' />
                            <p>No appointments yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DoctorHome