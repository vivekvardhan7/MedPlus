import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.webp";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import pic5 from "../assets/pic5.jpg";
import GeminiInReact from "./Api";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import Material-UI components
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chatIconClick, setChatIconClick] = useState(false); // State to manage chat icon click
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChat = () => {
    setChatIconClick(!chatIconClick); // Toggle chat icon click state
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  const faqs = [
    {
      question: "How do I know where to begin with my new MedMinder unit?",
      answer:
        "Start by setting up your MedMinder unit according to the user manual. Ensure it's connected to power and follow the on-screen instructions to get started.",
    },
    {
      question: "Who do I call if I have questions about using MedMinder?",
      answer:
        "You can contact our support team at 1-888-MED-MIND for any questions or assistance with your MedMinder unit.",
    },
    {
      question: "How do I program MedMinder to match my medication schedule?",
      answer:
        "Use the settings menu on your MedMinder unit to input your medication schedule. You can set specific times for each medication.",
    },
    {
      question: "What do I need to have at home in order to operate MedMinder?",
      answer:
        "You need a stable power source, your medications, and the user manual. Ensure you have a Wi-Fi connection if your unit supports online features.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-dark-blue text-white py-4 px-6 flex justify-between items-center shadow-md">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">💊 MedTrack</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Navigation Buttons and Search Bar */}
        <div
          className={`md:flex items-center ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          {/* Search Bar (Hidden on Small Screens) */}
          <div className="md:flex items-center bg-white text-gray-700 px-4 py-2 rounded-full shadow-md mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              placeholder="Search for medicines..."
              className="outline-none bg-transparent w-64"
            />
            <button className="ml-2 text-blue-600 hover:text-blue-800">
              🔍
            </button>
          </div>

          {/* Language Selector */}
          <select className="bg-white text-dark-blue px-3 py-2 rounded-md mr-4 cursor-pointer border border-gray-300 hover:bg-blue-200 transition mb-4 md:mb-0">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>

          {/* Login and Register Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/signin">
              <button className="bg-white text-dark-blue px-4 py-2 rounded-md hover:bg-blue-200 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white text-dark-blue px-4 py-2 rounded-md hover:bg-blue-200 transition">
                Register
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Image Carousel */}
      <div className="w-full h-[50vh] md:h-[70vh] mx-auto mt-6">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="w-full h-full rounded-lg overflow-hidden shadow-md"
        >
          {[pic1, pic2, pic3].map((pic, index) => (
            <SwiperSlide key={index}>
              <img
                src={pic}
                alt={`Medicine Tracker ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero Section */}
      <header className="relative w-full h-[90vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 mb-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/path-to-hero-image.jpg"
            alt="Medicine Reminder"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg text-black">
            Never Miss a Dose Again!
          </h1>
          <p className="text-lg md:text-xl mt-4 max-w-xl mx-auto drop-shadow-md text-black">
            Stay on top of your medications effortlessly with smart reminders
            and tracking features.
          </p>

          {/* Icons or Illustration */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
              alt="Medicine Icon"
              className="w-12 h-12"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/742/742751.png"
              alt="Reminder Icon"
              className="w-12 h-12"
            />
          </div>

          {/* Call to Action */}
          <Link to="/signup">
            <button className="mt-6 bg-dark-blue text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition transform hover:scale-105">
              Get Started Now
            </button>
          </Link>
        </div>
      </header>

      {/* About Section */}
      <section className="py-6 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Why Use MedTrack?
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          MedTrack is designed to help individuals and caregivers stay on top of
          their medications. With timely reminders and an intuitive interface,
          you can focus on your health without the stress of forgetting doses.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">🔔 Smart Reminders</h3>
            <p className="text-gray-600 mt-2">
              Get notified when it's time to take your medicine.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">📜 Medicine Log</h3>
            <p className="text-gray-600 mt-2">
              Keep track of your medications and history.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold">👨‍⚕️ Doctor Integration</h3>
            <p className="text-gray-600 mt-2">
              Easily share medication reports with your doctor.
            </p>
          </div>
        </div>
      </section>

      {/* Medication Supply Section as a Card */}
      <section className="flex justify-center py-12 px-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center max-w-4xl w-full">
          <div className="md:w-1/2 text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              Always remain in control over your medication supply
            </h2>
            <p className="text-gray-600 mt-4">
              Our medication tracker app is your digital brain extension for
              keeping on top of your supply. MyTherapy will remind you well in
              advance when it's time for a refill or to get a new prescription.
            </p>
            <p className="text-gray-600 mt-4">
              Use this feature to easily and automatically avoid ever running
              out of your medication.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src={pic4}
              alt="Medication Supply"
              className="w-full max-w-sm rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Pic5 Section */}
      <section className="flex flex-col items-center justify-center py-12 px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Left Side */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt="Medicine Tracker Icon"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900">
              Medicine Tracker & Reminder
            </h3>
            <p className="text-gray-700 mt-2">
              Stay on top of your medications with our smart tracking and
              reminder system. Get timely alerts for your doses, track your
              prescription schedules, and ensure you never miss a medication
              again.
            </p>
          </div>

          {/* Center Image */}
          <div className="flex items-center justify-center">
            <img
              src={pic5}
              alt="MedMinder"
              className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991165.png"
              alt="Smart Analytics Icon"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900">Smart Analytics</h3>
            <p className="text-gray-700 mt-2">
              Gain valuable insights into your medication habits with our smart
              analytics. Track adherence, monitor trends, and optimize your
              health with personalized data-driven recommendations.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827342.png"
              alt="Automated alerts"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900">
              Automated Alerts
            </h3>
            <p className="text-gray-700 mt-2">
              Stay on track with automated pill reminders and real-time alerts.
              Get notifications for missed doses and upcoming medications,
              ensuring consistent and timely intake.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966322.png"
              alt="Smart Medication Manager"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-bold text-blue-900">
              Smart Medication Manager
            </h3>
            <p className="text-gray-700 mt-2">
              Take control of your health with AI-powered medication tracking.
              Our system organizes prescriptions, tracks refills, and ensures
              you never miss a dose.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          FAQs
        </Typography>
        {[
          "How does the medicine reminder work?",
          "Can I track multiple medications?",
          "Can I track medicines for family members?",
          "Can I export my medicine history?",
          "Is my data secure?",
        ].map((faq, index) => (
          <Accordion key={index} elevation={3} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{faq}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                {faq.includes("reminder") &&
                  "You can set reminders for each medicine, and our system will notify you when it's time."}
                {faq.includes("multiple medications") &&
                  "Yes, you can add multiple medications with different schedules."}
                {faq.includes("family members") &&
                  "Yes! You can create multiple profiles and track medicines for loved ones."}
                {faq.includes("export") &&
                  "Yes, you can download a report of your medicine log and share it with your doctor."}
                {faq.includes("secure") &&
                  "Absolutely! We use encryption to ensure your data stays private and secure."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Why Do You Need PillPal? Section */}
      <section className="py-12 px-6 bg-white text-black">
        <h2 className="text-3xl font-bold text-center mb-6">
          Why do you need MedTrack?
        </h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
              alt="Medication Management"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-xl font-semibold">
              Medication Management is Overwhelming
            </h4>
            <p className="mt-2">
              Managing multiple prescriptions can be confusing and stressful.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/742/742751.png"
              alt="Missed Doses"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-xl font-semibold">
              Missed Doses Can Be Harmful
            </h4>
            <p className="mt-2">
              Forgetting to take medication can worsen health and lead to
              unnecessary hospital visits.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
              alt="Complex Regimens"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-xl font-semibold">
              Complex Regimens Need Simplicity
            </h4>
            <p className="mt-2">
              PillPal simplifies medication schedules, especially for elderly
              patients and caregivers.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Prevent Complications"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-xl font-semibold">
              Prevent Health Complications
            </h4>
            <p className="mt-2">
              PillPal helps you avoid the serious risks of missed or incorrect
              doses.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
              alt="Stay on Track"
              className="w-16 h-16 mb-4"
            />
            <h4 className="text-xl font-semibold">Stay on Track</h4>
            <p className="mt-2">
              PillPal ensures consistency in medication adherence for yourself
              or someone you care for.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white text-center py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-semibold">
            We're Here Whenever You Need Us
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mt-6">
            <div>
              <p className="font-semibold">Email</p>
              <p>info@medtrack.com</p>
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>1-888-MED-TRACK</p>
            </div>
            <div>
              <p className="font-semibold">Open Hours</p>
              <p>Mon - Fri 8AM - 7PM ET</p>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p>320 Health Park, Norwood, MA 02062</p>
            </div>
          </div>
        </div>
        <p className="mt-4">&copy; 2025 MedTrack | All Rights Reserved</p>
      </footer>

      {/* Chat Icon and Chatbot Container */}
      <div>
        {chatIconClick ? (
          <div
            className="bot-container"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              width: "300px",
            }}
          >
            <GeminiInReact handleChat={handleChat} />
          </div>
        ) : (
          <div
            className="chat-icon"
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              cursor: "pointer",
              fontSize: "2rem",
              color: "#3b82f6",
            }}
            onClick={handleChat}
          >
            <i className="fas fa-comments fa-1x"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
