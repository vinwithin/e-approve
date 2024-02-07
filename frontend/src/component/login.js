import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async(e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/login", {
        email: email,
        password: password
      });
      navigate("/");
    } catch(error){
        if(error.response){
          setMsg("Email atau Password Salah");
        }
      
    }
  };
  return (
    <div className="flex justify-center h-screen max-w-full bg-[#f7ebf7] ">
      <div className="flex max-w-screen-sm max-h-max flex-1 flex-col px-6 py-12 mx-auto my-auto bg-[#dea6f7] drop-shadow-2xl rounded-lg">
      <h1 className="text-center bg-red-400 mb-2">{msg}</h1>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">     
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=#8c599c]"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={ Auth } className="space-y-6">
          
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-dark"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email} onChange={(e) => setEmail(e.target.value)}

                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-dark"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-dark hover:text-[dark"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <span>
                <a className="text-sm font-medium leading-6 text-dark">
                  Dont Have an Account?
                </a>
                <a
                  href="/register"
                  className="text-sm font-medium leading-6 text-blue-700"
                >
                  &nbsp; Register
                </a>
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#8c599c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
