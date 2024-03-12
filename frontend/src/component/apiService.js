import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ApiService = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState('');
    const [expired, setExpired] = useState('');
    const navigate = useNavigate();


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
     
      return { token, name, refreshToken, axiosJWT };
}

export default ApiService;
