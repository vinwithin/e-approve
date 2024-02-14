import React, { useState } from "react";
import Surat from "./surat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
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
    <>
      <div className="flex flex-row lg:flex-row h-screen">
        <div
          className={`bg-gray-800 w-48 max-h-screen lg:block  ${
            isSidebarOpen ? "block" : "hidden "
          } `}
        >
          <div className="p-4">
            <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
          </div>
          <nav className="mt-6 ">
            <a
              href="/"
              className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
            >
              Home
            </a>
            <a
              href="/create"
              className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
            >
              Unggah Surat
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-gray-200 hover:bg-gray-700"
            >
              Messages
            </a>
          </nav>
        </div>
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
                  E-APPROVE
                </h1>
              </div>
              <div className=" flex items-center ">
              <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>

              </div>
            </div>
          </nav>
          <div>
            {/* <button onClick={getUsers} className="mt-2 bg-blue-400">
            Daftar Surat
          </button> */}
           {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
