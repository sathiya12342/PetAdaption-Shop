import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Login from "../components/Login";
import Register from "../components/Register";
import { setSearchTerm, setUsername, clearUsername } from "../redux/ProductSlice";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);
  const username = useSelector((state) => state.product.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      dispatch(setUsername(savedUser));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    dispatch(clearUsername());
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));
    navigate("/filter-data");
    setSearch("");
  };

  const openSignUp = () => {
    setIsLogin(false);
    setIsModalOpen(true);
  };

  const openLogin = () => {
    setIsLogin(true);
    setIsModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-red-500">
          <Link to="/">P-SHOP</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex relative flex-1 mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              value={search}
              placeholder="Search Products..."
              className="w-full border rounded-full py-2 px-4 focus:outline-red-400"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="absolute right-3 top-3 text-red-500 cursor-pointer" />
            </button>
          </form>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-lg text-gray-600 hover:text-red-500" />
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
                {products.length}
              </span>
            )}
          </Link>

          {/* Login / Username */}
          {username ? (
            <div className="hidden md:flex items-center space-x-3">
              <span className="font-bold text-gray-700">👋 {username}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="hidden md:block font-bold text-gray-700 hover:text-red-500"
              onClick={() => setIsModalOpen(true)}
            >
              Login | Register
            </button>
          )}

          {/* Hamburger Menu (Mobile) */}
          <button
            className="block md:hidden text-xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center justify-center space-x-10 py-3 text-sm font-bold bg-gray-50">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <Link to="/shop" className="hover:text-red-500">Shop</Link>
        <Link to="/petadoption" className="hover:text-red-500">PetAdoption</Link>
        <Link to="/contact" className="hover:text-red-500">Contact</Link>
        <Link to="/about" className="hover:text-red-500">About Us</Link>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 flex flex-col items-center py-4 space-y-4 text-sm font-bold">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/petadoption" onClick={() => setMenuOpen(false)}>PetAdoption</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>

          {username ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
              className="text-red-500"
            >
              Login | Register
            </button>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Modal>
    </nav>
  );
};

export default Navbar;
