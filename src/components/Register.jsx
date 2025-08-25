import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/ProductSlice";

const Register = ({ setIsModalOpen, openLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    const newUser = { name, email, password };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("username", name);

    // Update redux
    dispatch(setUsername(name));

    alert("Account created successfully ✅");

    // Close modal
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <span
          className="text-green-600 cursor-pointer"
          onClick={openLogin}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
