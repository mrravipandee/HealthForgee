import { assets } from '../assets/assets'

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg overflow-hidden mx-4 md:mx-10 my-16'>
            
            {/* Left Content */}
            <div className='flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center'>
                <h2 className='text-xl md:text-2xl lg:text-4xl font-bold text-white leading-tight mb-6'>
                    <ol>
                        <li><span className='block'>AI + Human Healthcare</span></li>
                        <li><span className='block mt-3 md:mt-4'>Post-Discharge Recovery Support</span></li>
                        <li><span className='block mt-3 md:mt-4'>Affordable + Accessible</span></li>
                    </ol>
                </h2>
                
                <p className='text-blue-100 text-lg md:text-xl mb-8 max-w-lg'>
                    Combining cutting-edge AI technology with compassionate human care for complete recovery journeys.
                </p>
                
                <div className='flex flex-col sm:flex-row gap-4'>
                    <button className='bg-white text-primary border hover:bg-primary/70 hover:text-white hover:border font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md'>
                        Learn More
                    </button>
                    <button className='bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-300'>
                        Get Started
                    </button>
                </div>
            </div>

            {/* Right Image */}
            <div className='hidden md:block md:w-2/5 lg:w-[40%] relative flex items-end justify-center md:justify-end'>
                <div className='relative w-full max-w-md'>
                    <img 
                        className='w-full h-auto object-contain' 
                        src={assets.appointment_img} 
                        alt="Healthcare professional providing support" 
                    />
                    
                    {/* Floating stats element */}
                    <div className='absolute -bottom-4 left-0 right-0 mx-auto bg-white rounded-lg shadow-lg p-4 max-w-xs'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <div className='bg-green-100 p-2 rounded-full mr-3'>
                                    <svg className='w-5 h-5 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500'>Recovery Success</p>
                                    <p className='text-sm font-semibold'>94% Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;