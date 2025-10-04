import Image from "next/image"

const Footer = () => {
    return (
        <footer className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Copyright */}
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <Image src={'/logo.svg'} alt="Logo" width={150} height={60} />
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
                        <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} HealthCare. Providing quality healthcare services.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer