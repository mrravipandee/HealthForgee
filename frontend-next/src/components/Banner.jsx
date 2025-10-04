import { assets } from '../assets/assets'

const Banner = () => {
    return (
        <div className='bg-primary rounded-xl mx-4 md:mx-10 my-16 p-10 text-white'>
            <div className='max-w-4xl mx-auto text-center'>
                <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                    Quality Healthcare Made Accessible
                </h2>
                <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed'>
                    Trusted by thousands of patients for accurate diagnoses and compassionate care from certified medical professionals.
                </p>
                <button className='bg-white text-primary hover:bg-gray-100 font-semibold text-lg py-4 px-12 rounded-lg transition-colors duration-300'>
                    Start Your Consultation
                </button>
            </div>
        </div>
    )
}

export default Banner;