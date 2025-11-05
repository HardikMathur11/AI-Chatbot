import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnLoading } = UserData();

  const { fetchChats } = ChatData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="card-glass w-full max-w-6xl md:min-h-[70vh] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-8 bg-gradient-to-br from-pink-400 via-fuchsia-400 to-violet-400 text-white">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-floaty"></div>
          <div className="absolute -bottom-8 -right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl animate-floaty" style={{animationDelay:'.6s'}}></div>
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur mb-4"></div>
          <h3 className="text-2xl font-semibold">Verify your email</h3>
          <p className="text-white/90 text-sm mt-1 text-center">
            We sent a 6-digit code to your inbox. Enter it to continue.
          </p>
        </div>
        <form className="p-10 md:p-12" onSubmit={submitHandler}>
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-900">Verify</h2>
            <p className="text-slate-600 text-sm mt-1">Enter the 6-digit OTP sent to your email</p>
          </div>
          <div className="mb-5">
            <label className="block text-slate-700 mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-glass p-3 w-full tracking-widest text-center"
              placeholder="000000"
              required
            />
          </div>

          <button className="btn-primary w-full py-3">
            {btnLoading ? <LoadingSpinner /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
