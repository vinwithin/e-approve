import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token");
      setToken(response.data.accessToken);
      const decode = jwtDecode(response.data.accessToken);
      setName(decode.name);
      setExpired(decode.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currendDate = new Date();
      if (expired * 1000 < currendDate.getTime()) {
        const response = await axios.get("http://localhost:8000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decode = jwtDecode(response.data.accessToken);
        setName(decode.name);
        setExpired(decode.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  const logout = async() => {
    try{
      await axios.delete("http://localhost:8000/logout");
      navigate( "/login");
    }catch(error){
      console.log(error);
    }
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="flex flex-row lg:flex-row h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 w-48 lg:block  ${
          isSidebarOpen ? "block" : "hidden "
        } `}
      >
        <div className="p-4">
          <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
          >
            Settings
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
          >
            Messages
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-200">
        <nav className="flex bg-white h-20">
          <div className="p-4 flex flex-row justify-between w-full">
            <div className="flex items-center">
              <button
                className="block lg:hidden text-black py-1  rounded-md mb-4"
                onClick={toggleSidebar}
              >
                <svg
                  className="w-6 h-6 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <h1 className="text-gray-800 lg:text-2xl py-1.5 font-semibold justify-start">
                Welcome to Dashboard
              </h1>
            </div>
            <div className="bg-blue-500 flex items-center ">
              <button onClick={logout} className="justify-end">Logout</button>
            </div>
          </div>
        </nav>

        <h1>Welcome back, {name}</h1>
        <div>
          <button onClick={getUsers} className="mt-2 bg-blue-400">
            Get Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
