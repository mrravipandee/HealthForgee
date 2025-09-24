import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 to-secondary/30 rounded-xl overflow-hidden mx-4 md:mx-8 my-6 border border-gray-100'>
            
            {/* Header Left Content */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 p-8 md:p-12 lg:p-16 '>
                <div>
                    <h1 className='text-2xl md:text-3xl lg:text-5xl text-gray-800 font-bold leading-tight mb-4 text-center md:text-left'>
                        Your Smart <span className='text-secondary'>AI Healthcare</span> Partner
                    </h1>
                    <p className='text-gray-600 text-[16px] md:text-lg mb-6 text-center md:text-left'>
                        Advanced medical care powered by AI technology for accurate diagnosis and personalized treatment plans.
                    </p>
                </div>
                
                <div className='flex items-center gap-4 mb-4'>
                    <div className='flex -space-x-3'>
                        <img className='w-16 h-8 md:w-24 md:h-10 rounded-full' src={assets.group_profiles} alt="Patient" />
                    </div>
                    <p className='text-gray-600 text-[12px] md:text-sm font-medium'>
                        <span className='text-secondary font-bold'>500+</span> patients trusted us this month
                    </p>
                </div>
                
                <div className='flex flex-col sm:flex-row gap-4 w-full'>
                    <a href='#appointment' className='flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex-1'>
                        Book Appointment 
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                    
                    <a href='#ai-bot' className='flex items-center justify-center gap-2 border border-secondary text-secondary hover:bg-secondary/40 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1'>
                        Try AI Health Bot
                        <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                    </a>
                </div>
                
                {/* <a href='#emergency' className='flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium mt-2 group'>
                    <div className='flex items-center justify-center w-10 h-10 bg-red-100 rounded-full group-hover:bg-red-200 transition-all'>
                        <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                    </div>
                    Emergency Help - Available 24/7
                </a> */}
            </div>

            {/* Header Right Image */}
            <div className='md:w-1/2 relative flex items-center justify-center p-8 hidden md:block'>
                <div className='relative w-full h-full '>
                    <img 
                        className='w-100 h-[32rem] absolute -bottom-8 transform hover:scale-105 transition-transform duration-500' 
                        src={assets.header_img} 
                        alt="Professional healthcare team" 
                    />
                    
                    {/* Floating badge element */}
                    <div className='absolute bottom-16 -right-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3'>
                        <div className='bg-green-100 p-2 rounded-full'>
                            <svg className='w-6 h-6 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <p className='text-xs text-gray-500'>Certified by</p>
                            <p className='text-sm font-semibold'>Health Organization</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;