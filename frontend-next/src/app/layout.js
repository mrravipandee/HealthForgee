import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import AppContextProvider from '../context/AppContext.jsx';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "HealthForge",
  description: "HealthForge is an AI-powered healthcare platform offering seamless appointments, virtual consultations, recovery support, emergency alerts, and personalized care, ensuring accessible, smart, and patient-friendly healthcare solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${geistMono.variable}`}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
