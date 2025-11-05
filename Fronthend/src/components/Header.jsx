import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-[pulse_3s_ease-in-out_infinite]"></div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Hello, how can I help you today?
        </h1>
      </div>
      {chats && chats.length === 0 && (
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-sm">Create new chat</span>
          <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-sm">Ask about algorithms</span>
          <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-sm">Generate study notes</span>
        </div>
      )}
    </div>
  );
};

export default Header;
