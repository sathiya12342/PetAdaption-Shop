import React from "react";
import { PawPrint, Heart, Home } from "lucide-react"; 
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50 px-6 md:px-16 lg:px-24 py-16">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center text-red-600 mb-6">
        About Us 🐾
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
        Welcome to <span className="font-bold text-red-600">P-SHOP</span>, your
        trusted home for pet adoption & supplies. We bring joy to families by
        connecting them with lovable pets and offering top-quality essentials.
      </p>

      {/* Hero Image */}
      <div className="flex justify-center mb-16">
      </div>

      {/* 3 Columns with Icons */}
      <div className="grid md:grid-cols-3 gap-10 text-center">
        {/* Mission */}
        <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
          <PawPrint className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            To create a bond between families and pets while ensuring they get
            the best care and products.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
          <Home className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-3">Our Vision</h2>
          <p className="text-gray-600">
            A world where every pet finds a loving home filled with happiness
            and care.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
          <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-3">Our Values</h2>
          <p className="text-gray-600">
            Love 💕, Responsibility 🐕, and Care 🐦 are the heart of everything
            we do.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
          Why Choose <span className="text-red-600">P-SHOP?</span>
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Because we’re not just a pet shop – we’re a community of animal
          lovers. From adoption guidance to premium supplies, we provide
          everything you and your furry friends need.
        </p>

        {/* Call-to-Action */}
        <Link to="/petadoption">
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg rounded-full shadow-md transition">
            Adopt Your Pet Today 🐶
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
