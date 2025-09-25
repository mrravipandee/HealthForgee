import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PatientsInfo = ({ onClose }) => {
  const { userData, backendUrl, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    gender: userData?.gender || "",
    email: userData?.email || "", // Auto-fill from user data
    height: userData?.height || "",
    weight: userData?.weight || "",
    bloodGroup: userData?.bloodGroup || "",
    medicalConditions: userData?.medicalConditions?.join(", ") || "",
    currentMedications: userData?.currentMedications?.join(", ") || "",
    allergies: userData?.allergies?.join(", ") || "",
    dietPreference: userData?.dietPreference || "",
    activityLevel: userData?.activityLevel || "",
    exerciseRoutine: userData?.exerciseRoutine || "",
    sleepDuration: userData?.sleepDuration || "",
    alcoholOrSmoking: userData?.alcoholOrSmoking || "",
    healthGoal: userData?.healthGoal || "",
    dietaryRestrictions: userData?.dietaryRestrictions?.join(", ") || "",
    preferredExerciseType: userData?.preferredExerciseType || "",
  });

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        email: userData.email || "",
        height: userData.height || "",
        weight: userData.weight || "",
        bloodGroup: userData.bloodGroup || "",
        medicalConditions: userData.medicalConditions?.join(", ") || "",
        currentMedications: userData.currentMedications?.join(", ") || "",
        allergies: userData.allergies?.join(", ") || "",
        dietPreference: userData.dietPreference || "",
        activityLevel: userData.activityLevel || "",
        exerciseRoutine: userData.exerciseRoutine || "",
        sleepDuration: userData.sleepDuration || "",
        alcoholOrSmoking: userData.alcoholOrSmoking || "",
        healthGoal: userData.healthGoal || "",
        dietaryRestrictions: userData.dietaryRestrictions?.join(", ") || "",
        preferredExerciseType: userData.preferredExerciseType || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent name and email fields from being changed (they come from user account)
    if (name === 'email' || name === 'name') {
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format data to match user model structure
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('height', formData.height);
      formDataToSend.append('weight', formData.weight);
      formDataToSend.append('bloodGroup', formData.bloodGroup);
      formDataToSend.append('medicalConditions', JSON.stringify(formData.medicalConditions.split(", ").filter(item => item.trim())));
      formDataToSend.append('currentMedications', JSON.stringify(formData.currentMedications.split(", ").filter(item => item.trim())));
      formDataToSend.append('allergies', JSON.stringify(formData.allergies.split(", ").filter(item => item.trim())));
      formDataToSend.append('dietPreference', formData.dietPreference);
      formDataToSend.append('activityLevel', formData.activityLevel);
      formDataToSend.append('exerciseRoutine', formData.exerciseRoutine);
      formDataToSend.append('sleepDuration', formData.sleepDuration);
      formDataToSend.append('alcoholOrSmoking', formData.alcoholOrSmoking);
      formDataToSend.append('healthGoal', formData.healthGoal);
      formDataToSend.append('dietaryRestrictions', JSON.stringify(formData.dietaryRestrictions.split(", ").filter(item => item.trim())));
      formDataToSend.append('preferredExerciseType', formData.preferredExerciseType);

      const res = await axios.post(
        `${backendUrl}/api/user/update-health-info`,
        formDataToSend,
        { headers: { token } }
      );
      
      console.log("Response:", res.data);
      if (res.data.success) {
        toast.success("Health information updated successfully!");
        onClose();
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#252C62] mb-2">
            Patient Information Form
          </h2>
          <p className="text-gray-600">
            Please fill in your details to help us provide personalized care
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-3 h-6 bg-[#577cff] rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-[#252C62]">
                Basic Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Full Name
                  <span className="text-xs text-gray-500 ml-2">(From your account)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  readOnly
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Email
                  <span className="text-xs text-gray-500 ml-2">(Auto-filled from your account)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  readOnly
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-3 h-6 bg-[#577cff] rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-[#252C62]">
                Health Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  placeholder="Height (cm/ft)"
                  value={formData.height}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (kg/lbs)"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Blood Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  placeholder="Blood Group"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Medical Conditions
                </label>
                <input
                  type="text"
                  name="medicalConditions"
                  placeholder="Known Medical Conditions (separate with commas)"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Current Medications
                </label>
                <input
                  type="text"
                  name="currentMedications"
                  placeholder="Current Medications (separate with commas)"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  placeholder="Allergies (separate with commas)"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Information */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-3 h-6 bg-[#577cff] rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-[#252C62]">
                Lifestyle Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Diet Preference
                </label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                >
                  <option value="">Select Diet Preference</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Activity Level
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                >
                  <option value="">Select Activity Level</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Exercise Routine
                </label>
                <input
                  type="text"
                  name="exerciseRoutine"
                  placeholder="Exercise Routine"
                  value={formData.exerciseRoutine}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Sleep Duration
                </label>
                <input
                  type="text"
                  name="sleepDuration"
                  placeholder="Sleep Duration (e.g., 7-8 hours)"
                  value={formData.sleepDuration}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Alcohol / Smoking Habits
                </label>
                <select
                  name="alcoholOrSmoking"
                  value={formData.alcoholOrSmoking}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                >
                  <option value="">Select Habits</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Goal / Personalization */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-3 h-6 bg-[#577cff] rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-[#252C62]">
                Goal / Personalization
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Health Goal
                </label>
                <select
                  name="healthGoal"
                  value={formData.healthGoal}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                >
                  <option value="">Select Health Goal</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Medical Condition Support">
                    Medical Condition Support
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  placeholder="Dietary Restrictions (separate with commas)"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#252C62] mb-1">
                  Preferred Exercise Type
                </label>
                <input
                  type="text"
                  name="preferredExerciseType"
                  placeholder="Preferred Exercise Type"
                  value={formData.preferredExerciseType}
                  onChange={handleChange}
                  className="border border-gray-300 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#577cff] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-[#252C62] font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#577cff] text-white font-medium py-3 px-8 rounded-lg hover:bg-[#4669e0] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientsInfo;
