import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import DoctorRegistration from './pages/DoctorRegistration'
import DoctorLogin from './pages/DoctorLogin'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import PatientsInfo from './components/PatientsInfo'
import { useEffect, useState, useContext } from 'react'
import { AppContext } from './context/AppContext'

const App = () => {
  const { token, userData } = useContext(AppContext);
  const [showPatientInfo, setShowPatientInfo] = useState(false);

  // Check if user has completed health information
  const hasHealthInfo = userData && (
    userData.height || 
    userData.weight || 
    userData.bloodGroup !== 'Not Selected' ||
    userData.medicalConditions?.length > 0 ||
    userData.currentMedications?.length > 0 ||
    userData.dietPreference !== 'Not Selected'
  );

  useEffect(() => {
    // Show PatientsInfo form after login if user hasn't filled health info
    if (token && userData && !hasHealthInfo) {
      // Check if user has already dismissed the form in this session
      const hasSeenForm = sessionStorage.getItem('hasSeenPatientForm');
      if (!hasSeenForm) {
        setShowPatientInfo(true);
      }
    }
  }, [token, userData, hasHealthInfo]);

  const handleClosePatientInfo = () => {
    setShowPatientInfo(false);
    // Remember that user has seen the form in this session
    sessionStorage.setItem('hasSeenPatientForm', 'true');
  };

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      {showPatientInfo && (
        <PatientsInfo onClose={handleClosePatientInfo} />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctor-registration' element={<DoctorRegistration />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App