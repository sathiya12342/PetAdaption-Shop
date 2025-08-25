import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Categories, mockData } from '../assets/mockData'
import HeroImage from '../assets/Images/heropage1.jpg'
import InfoSection from '../components/InfoSection';
import CategorySection from '../components/CategorySection';
import { setProducts } from '../redux/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Shop from '../pages/Shop';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product);

  useEffect(() => {
    dispatch(setProducts(mockData));
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white mt-2 px-4 md:px-12 lg:px-24">

      {/* Hero Section with Categories */}
      <div className="container mx-auto py-6 flex flex-col md:flex-row gap-6">

        {/* Sidebar Categories */}
        <div className="w-full md:w-3/12">
          <div className="bg-red-600 text-white text-sm font-bold px-4 py-3 rounded-t-md">
            SHOP BY CATEGORIES
          </div>
          <ul className="space-y-3 bg-gray-100 p-4 rounded-b-md">
            {Categories.map((category, index) => (
              <li key={index} className="flex items-center text-sm font-medium hover:text-red-600 cursor-pointer transition-colors">
                <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Banner */}
        <div className="w-full md:w-9/12 relative h-64 sm:h-80 md:h-96">
          <img 
            src={HeroImage} 
            alt="Hero Banner" 
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
          <div className="absolute top-10 sm:top-16 left-6 sm:left-12 text-white drop-shadow-md">
            <p className="text-sm sm:text-base font-semibold mb-2">Yousof | P-Shop</p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">WELCOME TO OUR PET SHOP</h1>
            <p className="text-sm sm:text-lg mt-2 font-medium">Find the best products for your beloved pets</p>
            <Link to="/shop">
              <button className="bg-red-600 px-6 sm:px-8 py-2 text-white font-medium mt-4 rounded-lg shadow-md 
                hover:bg-gray-800 transform transition-transform duration-300 hover:scale-105">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <InfoSection />

      {/* Category Section */}
      <CategorySection />

      {/* Top Products */}
      <div className="container mx-auto py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
          {products.products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
     {/* Shop Section */}
      <Shop />
    </div>
  );
};

export default Home;
