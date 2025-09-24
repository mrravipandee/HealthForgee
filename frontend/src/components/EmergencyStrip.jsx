import { useState } from 'react';
import { Siren, MapPin, X, Camera, AlertTriangle } from 'lucide-react';

const EmergencyStrip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmergencyConfirmed, setIsEmergencyConfirmed] = useState(false);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);

  const handleEmergencyClick = () => {
    setIsModalOpen(true);
  };

  const confirmEmergency = () => {
    setIsEmergencyConfirmed(true);
    getLocation();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation({ error: "Unable to get location" });
        }
      );
    } else {
      setLocation({ error: "Geolocation is not supported by this browser." });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEmergency = () => {
    // In a real app, this would send the emergency alert with image and location
    console.log("Emergency alert sent!", { location, image });
    alert("Emergency alert has been sent with your location!");
    resetModal();
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsEmergencyConfirmed(false);
    setLocation(null);
    setImage(null);
  };

  return (
    <>
      {/* Floating Emergency Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={handleEmergencyClick}
          className="bg-secondary hover:bg-secondary/90 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
          aria-label="Emergency help"
        >
          <Siren className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Emergency Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 md:p-6 border-b">
              <h2 className="text-lg md:text-xl font-bold text-primary">
                {isEmergencyConfirmed ? 'Emergency Assistance' : 'Confirm Emergency'}
              </h2>
              <button onClick={resetModal} className="text-primary/70 hover:text-primary">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              {!isEmergencyConfirmed ? (
                <div className="text-center">
                  <div className="bg-secondary/10 p-3 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-primary mb-2">Is this an emergency?</h3>
                  <p className="text-primary/70 text-sm md:text-base mb-4 md:mb-6">Please confirm if you need immediate emergency assistance.</p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={resetModal}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-primary font-medium py-2 md:py-3 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmEmergency}
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Siren className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Yes, Emergency
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4 md:mb-6">
                    <h3 className="font-medium text-primary mb-2 md:mb-3">Share your location</h3>
                    <div className="bg-primary/10 p-3 md:p-4 rounded-lg flex items-start">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 mr-2 md:mr-3" />
                      <div>
                        <p className="text-xs md:text-sm text-primary/80">
                          {location ? (
                            location.error ? (
                              <span className="text-red-600">{location.error}</span>
                            ) : (
                              `Location shared: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                            )
                          ) : (
                            'Getting your location...'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6">
                    <h3 className="font-medium text-primary mb-2 md:mb-3">Upload image (optional)</h3>
                    <label className="block border-2 border-dashed border-primary/20 rounded-lg p-4 md:p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                      {image ? (
                        <div className="flex flex-col items-center">
                          <img src={image} alt="Uploaded" className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md mb-2" />
                          <span className="text-xs md:text-sm text-primary/80">Image uploaded</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Camera className="w-6 h-6 md:w-8 md:h-8 text-primary/40 mb-2" />
                          <span className="text-xs md:text-sm text-primary/70">Click to upload an image</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    onClick={handleSubmitEmergency}
                    disabled={!location || location.error}
                    className="w-full bg-secondary hover:bg-secondary/90 disabled:bg-secondary/70 text-white font-medium py-2 md:py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Siren className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Send Emergency Alert
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyStrip;