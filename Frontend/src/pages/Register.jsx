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
    <div className="flex justify-center items-center h-screen p-4 overflow-hidden relative">
      <div className="bg-blobs">
        <span className="bg-blob-pink animate-floaty" style={{ width: '50%', height: '50%', top: '0', left: '0' }}></span>
        <span className="bg-blob-cyan animate-floaty" style={{ width: '50%', height: '50%', bottom: '0', right: '0', animationDelay: '1.5s' }}></span>
      </div>

      <div className="card-glass w-full max-w-5xl md:min-h-[600px] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 animate-fadeUp">
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-12 bg-white/5 border-r border-white/10 text-center">
          <div className="absolute top-[-20%] right-[-20%] h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-20%] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-500 shadow-2xl shadow-cyan-500/30 flex items-center justify-center mb-8 transform hover:scale-110 transition-transform duration-500">
            <div className="h-10 w-10 border-2 border-white rounded-full"></div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">Join Us Today</h3>
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
            Create your account and unlock the full potential of our AI-powered assistant.
          </p>
        </div>

        <form className="p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto thin-scrollbar" onSubmit={submitHandler}>
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">It only takes a minute to get started.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-3.5 py-3 text-sm text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-3.5 py-3 text-sm text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-3.5 py-3 text-sm text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#1e1e21] border border-[#3f3f46] rounded-lg px-3.5 py-3 text-sm text-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-4 mt-8 font-semibold text-lg tracking-wide hover:shadow-2xl hover:shadow-cyan-500/20" disabled={btnLoading}>
            {btnLoading ? <LoadingSpinner /> : "Create Account"}
          </button>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors ml-1"
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