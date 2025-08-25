import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../redux/ProductSlice';

const Login = ({ openSignUp, setIsModalOpen }) => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

  
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password!");
      return;
    }

  
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("username", username);

  
    dispatch(setUsername(username));

    // Close modal
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login
        </button>
      </form>

      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <span
          className="text-red-500 cursor-pointer"
          onClick={openSignUp}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
