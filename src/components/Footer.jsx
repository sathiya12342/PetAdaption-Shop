import React from 'react'
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-10 px-6 md:px-16 lg:px-24'>
      {/* Grid */}
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12'>
        
        {/* Brand Section */}
        <div>
          <h3 className='text-2xl font-bold text-white'>P-Shop</h3>
          <p className='mt-4 text-sm leading-relaxed'>
            Your one-stop shop for all pet needs 🐾. From food to toys, we have it all!  
            Shop now and give your pet the best experience with our wide range of products.
          </p>
        </div>

        {/* Quick Links */}
        <div className='flex flex-col md:items-center'>
          <h4 className='text-lg font-semibold text-white'>Quick Links</h4>
          <ul className='mt-4 space-y-3'>
            {[
              { name: "Home", to: "/" },
              { name: "Shop", to: "/shop" },
              { name: "Contact", to: "/contact" },
              { name: "About Us", to: "/about" }
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className='relative group text-gray-300 hover:text-red-500 transition duration-300'
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className='text-lg font-semibold text-white'>Follow Us</h4>
          <div className='flex space-x-4 mt-4'>
            {[FaFacebook, FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className='text-gray-400 hover:text-red-500 text-2xl transition transform hover:scale-110'
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <form className='flex items-center justify-center mt-8'>
            <input
              type="email"
              placeholder='Enter Email'
              className='w-full p-3 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
            <button
              className='bg-red-600 text-white px-5 py-3 rounded-r-lg hover:bg-red-700 transition duration-300'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mt-10 border-t border-gray-700 pt-6'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center text-sm'>
          <p className='text-gray-400'>&copy; 2025 P-Shop. All rights reserved.</p>
          <div className='flex space-x-6 mt-4 md:mt-0'>
            <a href="#" className='hover:text-red-500 transition'>Privacy Policy</a>
            <a href="#" className='hover:text-red-500 transition'>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
