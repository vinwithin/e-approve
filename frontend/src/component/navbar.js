import React from "react";

const navbar = () => {
  return (
  <>
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

        <h1 className="mx-auto p-6">Welcome back, {name}</h1>
        <div>
          {/* <button onClick={getUsers} className="mt-2 bg-blue-400">
            Daftar Surat
          </button> */}
          <Surat/>
        </div>
      </div>
  </>
  );
};

export default navbar;
