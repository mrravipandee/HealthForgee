// components/SpecialityMenu.tsx
import React from 'react'
import { specialityData } from '../assets/assets'
import Link from 'next/link'
import Image from 'next/image'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 bg-gray-50'>
            {/* Header Section */}
            <div className='text-center max-w-2xl mx-auto px-4'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                    Find by <span className='text-primary'>Speciality</span>
                </h1>
                <p className='text-gray-600 text-lg leading-relaxed'>
                    Browse through our extensive list of trusted medical specialists and 
                    schedule your appointment hassle-free with expert healthcare professionals.
                </p>
            </div>

            {/* Speciality Grid */}
            <div className='flex justify-center gap-6 pt-8 w-full max-w-7xl mx-auto px-4 overflow-x-auto pb-4'>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full'>
                    {specialityData.map((item, index) => (
                        <Link 
                            href={`/doctors/${item.speciality.toLowerCase().replace(/\s+/g, '-')}`}
                            className='group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-primary/20 hover:translate-y-[-8px]'
                            key={index}
                        >
                            {/* Icon Container */}
                            <div className='w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                                <Image
                                    height={40}
                                    width={40}
                                    className='w-10 h-10 object-contain' 
                                    src={item.image} 
                                    alt={item.speciality}
                                />
                            </div>
                            
                            {/* Speciality Name */}
                            <p className='text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300'>
                                {item.speciality}
                            </p>
                            
                            {/* Hover Arrow */}
                            <div className='mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <svg className='w-4 h-4 text-primary' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* View All Button */}
            <div className='pt-8'>
                <Link 
                    href="/specialities"
                    className='inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                    <span>View All Specialities</span>
                    <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default SpecialityMenu