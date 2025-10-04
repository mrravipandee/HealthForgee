"use client";

import { Bell, Search, ChevronDown, Book, Cpu, User, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../../context/AppContext.jsx';
import axios from 'axios';

export default function Navbar() {
  const router = useRouter();
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Get user name with fallback
  const userName = userData?.name || 'User';
  const getUserImage = () => {
    if (userData?.image) {
      // Check if it's a URL or base64
      if (userData.image.startsWith('http')) {
        return userData.image;
      } else if (userData.image.startsWith('data:')) {
        return userData.image;
      }
    }
    return '/default-avatar.png'; // Default avatar image
  };





  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      // Don't close popup when clicking outside - user must click cancel/save
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Data
  const notifications = [
    {
      id: 1,
      msg: "New features are added",
      icon: <Book className="h-4 w-4" />,
      time: "2 hours ago",
    },
    {
      id: 2,
      msg: "Backend API Restful 2.0",
      icon: <Cpu className="h-4 w-4" />,
      time: "1 day ago",
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear local storage first
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('dToken');
      sessionStorage.clear();

      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        // Even if API fails, still redirect since we cleared local storage
        toast.success("Logged out successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if there's an error
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
      setShowProfileMenu(false);
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
    setShowProfileMenu(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const profileMenu = [
    { label: "Profile", icon: <User className="h-4 w-4" />, href: "/patient/profile" },
    { label: "Settings", icon: <Settings className="h-4 w-4" />, href: "/setting" },
    {
      label: "Logout",
      icon: <LogOut className="h-4 w-4" />,
      onClick: confirmLogout
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  return (
    <>
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

      <nav className="w-full px-4 py-3 mt-2 flex justify-end relative">
        <div className="bg-white px-6 py-2 rounded-full flex justify-end items-center gap-4 shadow-sm">
          {/* Search Bar */}
          <div className="w-3/5 hidden md:block">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-100 transition duration-200 relative"
                aria-label="Notifications"
                aria-expanded={showNotifications}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Arrow indicator */}
                  <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200" />

                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-medium text-sm text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <li key={notification.id}>
                        <div className="flex items-start p-3 hover:bg-gray-50 cursor-pointer">
                          <div className="flex-shrink-0 mt-1 mr-3 text-gray-500">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800">
                              {notification.msg}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="User menu"
                aria-expanded={showProfileMenu}
              >
                <div className="flex items-center gap-3">
                  {/* User name with greeting - hidden on small screens */}
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-gray-800 items-center gap-2">
                      Hello <span>{userName ? userName.slice(0, 6) : ""}</span>
                    </div>
                    {/* <div className="text-xs text-gray-500">{userName}</div> */}
                  </div>
                  <Image
                    src={getUserImage()}
                    height={36}
                    width={36}
                    alt="User profile"
                    className="rounded-full border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Arrow indicator */}
                  <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200" />

                  {/* User greeting section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                        <Image
                          src={getUserImage()}
                          height={40}
                          width={40}
                          alt="User profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Hello {userName}</div>
                        <div className="text-xs text-gray-500">Welcome back!</div>
                      </div>
                    </div>
                  </div>

                  <ul className="py-1">
                    {profileMenu.map((item, index) => (
                      <li key={index}>
                        {item.onClick ? (
                          <button
                            onClick={item.onClick}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>


      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <LogOut className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <p className="text-sm text-gray-500">Are you sure you want to logout?</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}