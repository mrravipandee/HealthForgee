import { 
  BookOpenText, 
  BotMessageSquare, 
  Ambulance, 
  ClipboardPlus, 
  Users, 
  Gamepad2 
} from 'lucide-react';

const FeaturesHighlight = () => {
  const features = [
    {
      icon: <BookOpenText className="w-10 h-10 text-blue-600" />,
      title: 'Smart Appointment Booking',
      description: 'Book doctors in seconds with our intelligent scheduling system that finds the best specialists for your needs.'
    },
    {
      icon: <BotMessageSquare className="w-10 h-10 text-blue-600" />,
      title: 'AI Symptom Checker',
      description: 'Get preliminary assessments using our advanced AI before consulting with healthcare professionals.'
    },
    {
      icon: <Ambulance className="w-10 h-10 text-blue-600" />,
      title: 'One-Click Emergency SOS',
      description: 'Immediate emergency assistance with your location shared to nearest hospitals and emergency contacts.'
    },
    {
      icon: <ClipboardPlus className="w-10 h-10 text-blue-600" />,
      title: 'Upload Reports & Get Recovery Plan',
      description: 'Upload medical reports and receive personalized recovery plans from our AI system and verified doctors.'
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: 'Family Health Dashboard',
      description: 'Manage your entire family\'s health records, appointments, and medications in one secure place.'
    },
    {
      icon: <Gamepad2 className="w-10 h-10 text-blue-600" />,
      title: 'Gamified Recovery Journey',
      description: 'Stay motivated with engaging recovery programs that track progress and reward achievements.'
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary/90 mb-4">
            Our <span className="text-secondary">Smart Healthcare</span> Features
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover how our AI-powered platform makes healthcare simpler, faster, and more effective for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full group hover:-translate-y-1"
            >
              <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-6 group-hover:bg-secondary/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary/90 mb-4">{feature.title}</h3>
              <p className="text-primary/60 flex-grow mb-5">{feature.description}</p>
              <a 
                href="#learn-more" 
                className="inline-flex items-center text-secondary hover:text-primary/80 font-medium text-sm transition-colors mt-auto"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-14">
          <a 
            href="#all-features" 
            className="inline-flex items-center bg-secondary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Explore All Features
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesHighlight;