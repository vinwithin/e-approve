import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const PostSurat = () => {
    const [token, setToken] = useState('');
    const [nama, setNama] = useState('');
    const [name, setName] = useState('');
    const [name_letter, setName_letter] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [expired, setExpired] = useState('');
    const [msg, setMsg] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
      }, []);
      
      const refreshToken = async () => {
        try {
          const response = await axios.get("http://localhost:8000/token");
          setToken(response.data.accessToken);
          const decode = jwtDecode(response.data.accessToken);
          setNama(decode.name);
          setExpired(decode.exp);

        } catch (error) {
          if (error.response) {
            navigate("/login");
          }
        }
      };

      const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      }

      const PostSurat = async (e) => {
        try{
            e.preventDefault();
            const data = {
              name: name,
              name_letter: name_letter,
              file: selectedFile,
            };
            const config = {
              headers:{
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            },
            }
            await axios.post('http://127.0.0.1:8000/upload', data, config);
            setName('');
            setName_letter('');
            setSelectedFile(null);
            setSuccess("berhasil mengupload surat");
            navigate('/create');

        
        }catch(error){
            console.log(error.response);
            setMsg("gagal mengupload surat");
        }
      }
      const axiosJWT = axios.create();
      axiosJWT.interceptors.request.use(
      async (config) => {
        const currendDate = new Date();
        if (expired * 1000 < currendDate.getTime()) {
          const response = await axios.get("http://localhost:8000/token");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decode = jwtDecode(response.data.accessToken);
          setNama(decode.name);
          setExpired(decode.exp);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  return (
    <>
    <Sidebar>
      <div className="container mx-auto mt-8 p-6 bg-white">
      <h1 className="text-center bg-green-600 mb-2">{success}</h1>
      <h1 className="text-center bg-red-400 mb-2">{msg}</h1>
      <h1 className="font-bold text-lg font-serif mb-4">Silahkan Unggah Surat</h1>
        <form onSubmit={ PostSurat } className="space-y-4">
          <div>
            <label className="text-sm font-medium">
                Nama 
            </label>
            <div className="mt-1 mb-2 flex items-center">
                <input
                 type="text"
                className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                 value={name} onChange={(e) => setName(e.target.value)}
                 />
            </div>
            <label className="text-sm font-medium">
                Nama Surat
            </label>
            <div className="mt-1 mb-2 flex items-center">
                <input
                 type="text"
                className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                 value={name_letter} onChange={(e) => setName_letter(e.target.value)}
                 />
            </div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Pilih Surat (PDF)
            </label>
            <div className="mt-1 flex items-center">
              <input
                id="file"
                name="file"
                type="file"
                className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              
            >
              Upload Surat
            </button>
          </div>
        </form>
      </div>
      </Sidebar>
    </>
    
  );
};

export default PostSurat;
