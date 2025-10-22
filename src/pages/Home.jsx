import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router";

// Import images from assets folder
import heroImage from "../assets/hero.svg";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

function HomePage() {
  // Carousel slides with image + description
  const carouselSlides = [
    { img: slide1, text: "Track Your Expenses Easily" },
    { img: slide2, text: "Analyze Spending Habits" },
    { img: slide3, text: "Save Smarter with Insights" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 text-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Take Control of Your <span className="tracking-wide
                         bg-gradient-to-r from-cyan-200 via-white to-cyan-400 
                         bg-clip-text text-transparent 
                         transition-shadow duration-300 hover:drop-shadow-[0_2px_10px_rgba(255,255,255,0.7)]">Expenses</span>
          </h1>
          <p className="text-lg text-gray-300">
            PocketGuard helps you track, analyze, and save money effortlessly.
            Manage your budget and achieve financial freedom.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg shadow-lg transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-800 hover:bg-gray-200 px-6 py-3 rounded-lg shadow-lg transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Finance Management"
            className="rounded-2xl  w-96"
          />
        </div>
      </section>

      {/* Carousel Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          See PocketGuard in Action
        </h2>
        <div className="h-80 md:h-96">
          <Carousel
            indicators={true}       // bullets only
            leftControl={null}      // remove arrows
            rightControl={null}
            slideInterval={4000}    // auto-slide
            className="h-full"
          >
            {carouselSlides.map((slide, idx) => (
              <div
                key={idx}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Background Image */}
                <img
                  src={slide.img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {slide.text}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose PocketGuard?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">Simple & Intuitive</h3>
            <p className="text-gray-300">
              Track expenses with ease using a clean, modern interface.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
            <p className="text-gray-300">
              Your data is protected with industry-standard encryption.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">Built to Save</h3>
            <p className="text-gray-300">
              Identify spending habits and grow your savings over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
