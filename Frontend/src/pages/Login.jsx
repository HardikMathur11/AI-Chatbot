import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="card-glass w-full max-w-6xl md:min-h-[70vh] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 text-white">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-floaty"></div>
          <div className="absolute -bottom-8 -right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-floaty" style={{animationDelay:'.6s'}}></div>
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur mb-4"></div>
          <h3 className="text-2xl font-semibold">Welcome to ChatBot</h3>
          <p className="text-white/90 text-sm mt-1 text-center">
            Sign in with your email to continue your conversations.
          </p>
        </div>
        <form className="p-10 md:p-12" onSubmit={submitHandler}>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-900">Login</h2>
            <p className="text-slate-600 text-sm mt-1">Enter your email to continue</p>
          </div>
          <div className="mb-5">
            <label className="block text-slate-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass p-3 w-full"
              placeholder="you@example.com"
              required
            />
          </div>

          <button className="btn-primary w-full py-3" disabled={btnLoading}>
            {btnLoading ? <LoadingSpinner /> : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
