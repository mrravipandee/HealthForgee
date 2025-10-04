import { 
  Brain, 
  CalendarCheck, 
  Stethoscope, 
  Ambulance,
  ShieldCheck,
  Users,
  Clock,
  HeartPulse
} from 'lucide-react';

const SimpleFeaturesPage = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Diagnostics",
      description: "Smart symptom analysis with 95% accuracy"
    },
    {
      icon: <CalendarCheck className="w-8 h-8" />,
      title: "Easy Booking",
      description: "Book appointments in seconds"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Virtual Care",
      description: "Video consultations with doctors"
    },
    {
      icon: <Ambulance className="w-8 h-8" />,
      title: "Emergency Help",
      description: "Instant emergency response"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Data",
      description: "HIPAA compliant security"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Care",
      description: "Manage family health records"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Always available help"
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Health Tracking",
      description: "Monitor your health progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Features
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for modern medical needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleFeaturesPage;