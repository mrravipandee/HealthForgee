import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { Calendar, User, DollarSign, Clock, CheckCircle, XCircle, CreditCard } from 'lucide-react'

const DoctorAppointments = () => {
    const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken, getAppointments])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const calculateAge = (dob) => {
        if (!dob) return 'N/A'
        const birthDate = new Date(dob)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    if (!appointments) {
        return (
            <div className='flex items-center justify-center h-64'>
                <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    return (
        <div className='p-6'>
            <div className='flex items-center gap-3 mb-6'>
                <Calendar className='w-6 h-6 text-blue-600' />
                <h1 className='text-2xl font-bold text-gray-800'>All Appointments</h1>
                <span className='bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'>
                    {appointments.length} total
                </span>
            </div>

            {appointments.length === 0 ? (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center'>
                    <Calendar className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                    <h3 className='text-lg font-medium text-gray-800 mb-2'>No appointments yet</h3>
                    <p className='text-gray-600'>Your upcoming appointments will appear here</p>
                </div>
            ) : (
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                    {/* Desktop Table Header */}
                    <div className='hidden lg:grid lg:grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700'>
                        <div className='flex items-center gap-2'>
                            <span>#</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <User className='w-4 h-4' />
                            <span>Patient</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <CreditCard className='w-4 h-4' />
                            <span>Payment</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Clock className='w-4 h-4' />
                            <span>Age</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4' />
                            <span>Date & Time</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <DollarSign className='w-4 h-4' />
                            <span>Fees</span>
                        </div>
                        <div>Action</div>
                    </div>

                    {/* Appointments List */}
                    <div className='divide-y divide-gray-200 max-h-[70vh] overflow-y-auto'>
                        {appointments.map((appointment, index) => (
                            <div key={appointment._id} className='p-4 hover:bg-gray-50 transition-colors'>
                                {/* Mobile Layout */}
                                <div className='lg:hidden space-y-3'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <img 
                                                src={appointment.userData.image || '/api/placeholder/40/40'} 
                                                alt={appointment.userData.name}
                                                className='w-10 h-10 rounded-full object-cover'
                                            />
                                            <div>
                                                <p className='font-medium text-gray-800'>{appointment.userData.name}</p>
                                                <p className='text-sm text-gray-600'>Age: {calculateAge(appointment.userData.dob)}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            appointment.payment ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                            {appointment.payment ? 'Online' : 'Cash'}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-600'>
                                            {formatDate(appointment.slotDate)} at {appointment.slotTime}
                                        </span>
                                        <span className='font-medium text-gray-800'>
                                            {currency}{appointment.amount}
                                        </span>
                                    </div>
                                    <div className='flex justify-end'>
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

                                {/* Desktop Layout */}
                                <div className='hidden lg:grid lg:grid-cols-7 gap-4 items-center'>
                                    <div className='text-gray-600'>#{index + 1}</div>
                                    
                                    <div className='flex items-center gap-3'>
                                        <img 
                                            src={appointment.userData.image || '/api/placeholder/32/32'} 
                                            alt={appointment.userData.name}
                                            className='w-8 h-8 rounded-full object-cover'
                                        />
                                        <span className='font-medium text-gray-800'>{appointment.userData.name}</span>
                                    </div>
                                    
                                    <div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            appointment.payment ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                            {appointment.payment ? 'Online' : 'Cash'}
                                        </span>
                                    </div>
                                    
                                    <div className='text-gray-600'>{calculateAge(appointment.userData.dob)}</div>
                                    
                                    <div className='text-gray-600'>
                                        {formatDate(appointment.slotDate)}, {appointment.slotTime}
                                    </div>
                                    
                                    <div className='font-medium text-gray-800'>
                                        {currency}{appointment.amount}
                                    </div>
                                    
                                    <div>
                                        {appointment.cancelled ? (
                                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                                                Cancelled
                                            </span>
                                        ) : appointment.isCompleted ? (
                                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                                                Completed
                                            </span>
                                        ) : (
                                            <div className='flex gap-1'>
                                                <button
                                                    onClick={() => cancelAppointment(appointment._id)}
                                                    className='p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors'
                                                    title='Cancel'
                                                >
                                                    <XCircle className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => completeAppointment(appointment._id)}
                                                    className='p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors'
                                                    title='Complete'
                                                >
                                                    <CheckCircle className='w-4 h-4' />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorAppointments