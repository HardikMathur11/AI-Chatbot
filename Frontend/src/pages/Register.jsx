import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { registerUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
    
    registerUser(name, email, password, navigate);
  };
  
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="card-glass w-full max-w-6xl md:min-h-[70vh] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400 text-white">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-floaty"></div>
          <div className="absolute -bottom-8 -right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-floaty" style={{animationDelay:'.6s'}}></div>
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur mb-4"></div>
          <h3 className="text-2xl font-semibold">Join ChatBot</h3>
          <p className="text-white/90 text-sm mt-1 text-center">
            Create your account to start chatting with AI.
          </p>
        </div>
        <form className="p-10 md:p-12" onSubmit={submitHandler}>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-900">Register</h2>
            <p className="text-slate-600 text-sm mt-1">Create your account to continue</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-slate-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass p-3 w-full"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-slate-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass p-3 w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-glass p-3 w-full"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="btn-primary w-full py-3" disabled={btnLoading}>
            {btnLoading ? <LoadingSpinner /> : "Create Account"}
          </button>
          
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;