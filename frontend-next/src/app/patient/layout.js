"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/patient/Sidebar.jsx"
import Navbar from "../../components/patient/Navbar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PatientLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: "/patient/home", label: "Home" },
    { href: "/patient/appointment", label: "Appointments" },
    { href: "/patient/profile", label: "Profile" },
  ];

  return (
    <>
      <div className="bg-[#F6F8FF] h-screen flex">
        {/* Sidebar */}
        <div className="w-[18%] sm:w-[12%] md:w-[8%] lg:w-[18%] xl:w-[18%]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-[82%] sm:w-[88%] md:w-[92%] lg:w-[82%] xl:w-[82%] overflow-y-auto">
          <Navbar />
          {children}
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

