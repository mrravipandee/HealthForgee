'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../hooks/useAppContext'

const TopDoctors = () => {
    const router = useRouter()
    const { doctors } = useAppContext()

    const handleDoctorClick = (doctorId) => {
        router.push(`/appointment/${doctorId}`)
        window.scrollTo(0, 0)
    }

    const handleViewAll = () => {
        router.push('/doctors')
        window.scrollTo(0, 0)
    }

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-gray-800 px-4 sm:px-6'>
            {/* Header Section */}
            <div className='text-center max-w-2xl mx-auto'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                    Our <span className='text-primary'>Top Doctors</span>
                </h1>
                <p className='text-gray-600 text-lg leading-relaxed'>
                    Book appointments with our most trusted and experienced healthcare professionals 
                    dedicated to your well-being.
                </p>
            </div>

            {/* Doctors Grid */}
            <div className='w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-8'>
                {doctors.slice(0, 10).map((item) => (
                    <div 
                        onClick={() => handleDoctorClick(item._id)} 
                        className='bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:translate-y-[-8px] group'
                        key={item._id}
                    >
                        {/* Doctor Image */}
                        <div className='relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 h-48'>
                            <img 
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                src={item.image} 
                                alt={`Dr. ${item.name}`}
                            />
                            
                            {/* Availability Badge */}
                            <div className={`absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                item.available 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}>
                                <span className={`w-2 h-2 rounded-full ${
                                    item.available ? 'bg-green-500' : 'bg-gray-500'
                                }`}></span>
                                {item.available ? 'Available Today' : 'Not Available'}
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300'>
                                {item.name}
                            </h3>
                            <p className='text-secondary text-sm font-medium mb-2'>
                                {item.speciality}
                            </p>
                            
                            {/* Additional Info */}
                            <div className='flex items-center gap-4 text-xs text-gray-500 mt-3'>
                                {item.experience && (
                                    <div className='flex items-center gap-1'>
                                        <span>{item.experience}+ years</span>
                                    </div>
                                )}
                                {item.rating && (
                                    <div className='flex items-center gap-1'>
                                        <span>⭐ {item.rating}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            {doctors.length > 10 && (
                <div className='pt-8'>
                    <button 
                        onClick={handleViewAll}
                        className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium flex items-center gap-2'
                    >
                        View All Doctors
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default TopDoctors;