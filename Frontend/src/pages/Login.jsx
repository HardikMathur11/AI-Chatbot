import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  };
  return (
    <div className="flex justify-center items-center h-screen p-4 overflow-hidden relative">
      <div className="bg-blobs">
        <span className="bg-blob-indigo animate-floaty" style={{ width: '50%', height: '50%', top: '0', left: '0' }}></span>
        <span className="bg-blob-pink animate-floaty" style={{ width: '50%', height: '50%', bottom: '0', right: '0', animationDelay: '2s' }}></span>
      </div>

      <div className="card-glass w-full max-w-5xl md:min-h-[600px] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 animate-fadeUp">
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-12 bg-white/5 border-r border-white/10 text-center">
          <div className="absolute top-[-20%] left-[-20%] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-20%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 shadow-2xl shadow-indigo-500/30 flex items-center justify-center mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="h-20 w-20 bg-black/20 rounded-2xl border border-white/20 backdrop-blur-md"></div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">Welcome Back</h3>
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
            Access your personalized AI assistant and continue your conversation where you left off.
          </p>
        </div>

        <form className="p-10 md:p-14 flex flex-col justify-center" onSubmit={submitHandler}>
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-2">Login</h2>
            <p className="text-slate-400">Please enter your details to sign in.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-4 py-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-4 py-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-4 py-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button className="btn-primary w-full py-4 mt-8 font-semibold text-lg tracking-wide hover:shadow-2xl hover:shadow-indigo-500/20" disabled={btnLoading}>
            {btnLoading ? <LoadingSpinner /> : "Sign In"}
          </button>

          <div className="mt-8 text-center bg-white/5 p-4 rounded-xl border border-white/5">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline decoration-2 decoration-transparent hover:decoration-indigo-400 transition-all ml-1"
              >
                Create one now
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
