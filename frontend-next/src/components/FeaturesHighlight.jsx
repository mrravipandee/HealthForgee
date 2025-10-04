import { 
  BookOpenText, 
  BotMessageSquare, 
  Ambulance, 
  ClipboardPlus, 
  Users, 
  Gamepad2,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Clock,
  Brain,
  CalendarCheck
} from 'lucide-react';

const FeaturesHighlight = () => {
  const features = [
    {
      icon: <CalendarCheck className="w-8 h-8" />,
      title: 'Smart Appointment Booking',
      description: 'Book doctors in seconds with our intelligent scheduling system that finds the best specialists for your specific health needs.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Symptom Checker',
      description: 'Get instant preliminary assessments using our advanced AI technology before consulting with healthcare professionals.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: 'Emergency SOS',
      description: 'Immediate emergency assistance with automatic location sharing to nearest hospitals and emergency contacts.',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: <ClipboardPlus className="w-8 h-8" />,
      title: 'Digital Health Reports',
      description: 'Upload medical reports and receive personalized recovery plans from our AI system and verified doctors.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Family Health Dashboard',
      description: 'Manage your entire family\'s health records, appointments, and medications in one secure, centralized platform.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: 'Personalized Care Plans',
      description: 'Stay motivated with engaging health programs that track your progress and celebrate recovery milestones.',
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Virtual Consultations',
      description: 'Connect with certified doctors through secure video calls from the comfort of your home.',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Health Insurance',
      description: 'Seamless insurance claims processing and verification with our network of partner providers.',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Health Monitoring',
      description: 'Continuous health tracking with real-time alerts and personalized health insights.',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Trusted Healthcare Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Comprehensive <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">Healthcare</span> Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Experience the future of healthcare with our integrated platform that combines cutting-edge technology 
            with compassionate medical care for you and your family.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full hover:-translate-y-2"
            >
              {/* Gradient Border Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Icon with Gradient Background */}
              <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
                {/* Feature Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                {feature.description}
              </p>
              
              {/* Learn More Link */}
              <a 
                href="#learn-more" 
                className="inline-flex items-center text-primary hover:text-secondary font-semibold text-sm transition-all duration-300 group/link mt-auto"
              >
                <span className="border-b border-transparent group-hover/link:border-primary transition-all duration-300">
                  Discover More
                </span>
                <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Transform Your Healthcare Experience?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their health journey. 
              Get started today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#get-started" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <HeartPulse className="w-5 h-5 mr-2" />
                Start Your Health Journey
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
              <a 
                href="#learn-more" 
                className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Watch Demo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>50,000+ Patients</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesHighlight;