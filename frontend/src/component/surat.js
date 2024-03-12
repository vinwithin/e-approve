import React, {useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiService from "./apiService";

const Surat = () => {
    const [letter, setLetter] = useState([]);
    const [user, setUser] = useState([]);
    const { token, refreshToken, name, axiosJWT } = ApiService();
    


    useEffect(() => {
      refreshToken();
      getLetter();
    },[token] );
   


    
    const getUsers = async () => {
      const response = await axiosJWT.get("http://localhost:8000/users", {
        headers: {
          Authorization : `Bearer ${token}`,
        },
      });
      setUser(response.data);
    };

    const getLetter = async () => {
      try{
      const response = await axios.get("http://localhost:8000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setLetter(response.data);
    }catch(error){
      console.log(error)
    }
     
    };
  
  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
      <h1 className="mb-2">Welcome Back {name}</h1>
      {/* <div className="bg-blue-500 flex items-center w-24">
        <button onClick={getUsers} className="justify-end">get user</button>
      </div> */}
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Nama Surat</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
              {letter.map((data) => (
                <tr key={data.id}  className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{data.name}</p>
                        {/* <p className="text-xs text-gray-600">Developer</p> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">{data.name_letter}</td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {data.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">6/4/2000</td>
                </tr>
                ))}
                    
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Surat;
