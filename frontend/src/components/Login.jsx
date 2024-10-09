import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logError, setLogError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        null,
        {
          params: {
            username,
            password,
          },
        }
      );

      if (response.status == 200) {
        // Stocker l'état de connexion dans le localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        // Rediriger l'utilisateur vers la page d'accueil après la connexion
        navigate("/");
      }
    } catch (error) {
      // alert("Invalid credentials");
      setLogError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className=" mb-6 text-2xl font-bold text-center text-dark">
        WOD Tracker
      </h2>
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          {logError && (
            <div>
              <p className="block mb-2 text-sm font-medium text-red-600">
                {logError}
              </p>
            </div>
          )}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Username:{" "}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password:{" "}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
