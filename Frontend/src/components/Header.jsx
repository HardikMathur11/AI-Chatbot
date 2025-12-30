import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-[pulse_4s_ease-in-out_infinite] shadow-lg shadow-purple-500/20"></div>
        <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Hello, Friend
        </h1>
      </div>
      {chats && chats.length === 0 && (
        <div className="flex gap-3 flex-wrap">
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 cursor-pointer transition">Create new chat</span>
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 cursor-pointer transition">Ask about algorithms</span>
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 cursor-pointer transition">Generate study notes</span>
        </div>
      )}
    </div>
  );
};

export default Header;
