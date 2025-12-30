import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { ChatData } from "../context/ChatContext";
import { FaArrowUp, FaRobot, FaUser } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import MarkdownRenderer from "../components/MarkdownRenderer";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, newRequestLoading]);

  // Adjust text area height automatically
  const textareaRef = useRef(null);
  const handleInput = (e) => {
    setPrompt(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f12] text-slate-100 font-sans">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-full transition-all duration-300">

        {/* Mobile / Tablet Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#27272a] bg-[#0f0f12]/80 backdrop-blur-md z-20 absolute top-0 w-full">
          <button onClick={toggleSidebar} className="text-slate-400 hover:text-white">
            <GiHamburgerMenu size={20} />
          </button>
          <span className="font-semibold text-sm">Nexus AI</span>
          <div className="w-5"></div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col h-full pt-14 md:pt-0 relative">
          {!chats || chats.length === 0 ? (
            // Empty State
            <div className="flex-1 flex flex-col justify-center items-center p-8 animate-enter">
              <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_-5px_rgba(79,70,229,0.3)]">
                <FaRobot className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">How can I help you today?</h2>
              <p className="text-slate-400 text-center max-w-md leading-relaxed">
                I'm Nexus, your advanced AI assistant. Ask me anything about code, creative writing, or data analysis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-2xl">
                {[
                  { text: "Tell me a fun fact about Roman History", icon: "🏛️" },
                  { text: "Explain Quantum Physics to a 5-year-old", icon: "⚛️" },
                  { text: "Write a Python script for web scraping", icon: "🐍" },
                  { text: "What are the 4 main types of machine learning?", icon: "🤖" }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(item.text)}
                    className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] hover:bg-[#27272a] transition-all text-left flex items-center gap-3 group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-sm text-slate-300 font-medium">{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 thin-scrollbar scroll-smooth pb-44 md:pb-32"
              ref={messagecontainerRef}
            >
              {loading ? (
                <LoadingBig />
              ) : (
                <>
                  {messages && messages.length > 0 ? (
                    messages.map((e, i) => (
                      <div key={i} className="max-w-4xl mx-auto space-y-6">
                        {/* User Message */}
                        <div className="flex flex-row-reverse gap-4 animate-fadeUp">
                          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            <FaUser size={16} />
                          </div>
                          <div className="bg-[#2f2f2f] text-slate-100 px-6 py-3.5 rounded-3xl max-w-[85%] md:max-w-[75%] leading-relaxed">
                            {e.question}
                          </div>
                        </div>

                        {/* AI Message */}
                        <div className="flex gap-4 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
                          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mt-1 border border-emerald-500/20">
                            <FaRobot size={18} />
                          </div>
                          <div className="text-slate-100 w-full prose prose-invert prose-p:text-slate-100 prose-li:text-slate-100 max-w-none">
                            <MarkdownRenderer content={e.answer} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                      <FaRobot size={48} className="mb-4" />
                      <p>Start chatting...</p>
                    </div>
                  )}
                </>
              )}

              {newRequestLoading && (
                <div className="max-w-4xl mx-auto flex gap-4 animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-white/50"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/50 rounded w-3/4"></div>
                    <div className="h-4 bg-white/50 rounded w-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        {chats && chats.length > 0 && (
          <div className="fixed bottom-0 right-0 z-30 w-full md:w-[calc(100%-18rem)] bg-[#0f0f12]/90 backdrop-blur-lg border-t border-[#27272a] p-3">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={submitHandler}
                className="relative flex items-center gap-2 bg-[#1e1e21] border border-[#3f3f46] p-1.5 rounded-xl shadow-lg shadow-black/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all"
              >
                <textarea
                  className="flex-grow p-2.5 bg-transparent outline-none text-slate-100 placeholder:text-slate-500 text-base resize-none thin-scrollbar leading-relaxed"
                  placeholder="Write what you want to explore..."
                  rows={1}
                  value={prompt}
                  onChange={handleInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submitHandler(e);
                    }
                  }}
                />

                <button
                  disabled={newRequestLoading || !prompt.trim()}
                  className="p-2 rounded-lg bg-indigo-600 text-white disabled:bg-[#27272a] disabled:text-slate-500 hover:bg-indigo-500 transition-all flex items-center justify-center shrink-0"
                >
                  {newRequestLoading ? <LoadingSmall /> : <FaArrowUp size={16} />}
                </button>
              </form>
              <p className="text-center text-xs text-slate-500 mt-2">
                Nexus AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
