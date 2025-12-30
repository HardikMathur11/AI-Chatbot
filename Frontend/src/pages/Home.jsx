import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";
import MarkdownRenderer from "../components/MarkdownRenderer";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
  }, [messages]);
  return (
    <div className="relative flex h-screen bg-gradient-to-br from-white via-slate-50 to-sky-50">
      <div className="bg-blobs">
        <span className="bg-blob-indigo animate-floaty" style={{width:'60%',height:'50%'}}></span>
        <span className="bg-blob-cyan animate-floaty" style={{width:'60%',height:'45%'}}></span>
        <span className="bg-blob-pink animate-floaty" style={{width:'60%',height:'50%'}}></span>
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex flex-1 flex-col transition-all duration-300 md:ml-0 ${isOpen ? 'ml-64' : ''}`}>
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-white/70 backdrop-blur rounded-b-xl text-2xl border-b border-slate-200"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-24 md:mb-0 thin-scrollbar space-y-4"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i}>
                    <div className="mb-3 p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 flex gap-3 shadow-sm animate-fadeUp">
                      <div className="bg-slate-100 p-2 rounded-full text-slate-700 text-2xl h-10">
                        <CgProfile />
                      </div>
                      <div className="leading-relaxed">{e.question}</div>
                    </div>

                    <div className="mb-4 p-4 rounded-2xl bg-sky-50 text-slate-900 flex gap-3 border border-sky-200 shadow-sm animate-fadeUp" style={{animationDelay:'.05s'}}>
                      <div className="bg-sky-100 p-2 rounded-full text-sky-700 text-2xl h-10">
                        <FaRobot />
                      </div>
                      <div className="prose max-w-none">
                        <MarkdownRenderer content={e.answer} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6">
                  <p className="text-slate-600">No chat yet</p>
                </div>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 w-full md:w-[75%]">
          <form
            onSubmit={submitHandler}
            className="mx-auto max-w-4xl flex justify-center items-center gap-2"
          >
            <div className="flex-grow card-glass p-2 flex items-center gap-2">
              <input
                className="flex-grow p-3 rounded-lg outline-none bg-transparent placeholder:text-slate-500"
                type="text"
                placeholder="Enter a prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button className="p-3 rounded-lg text-2xl text-white btn-primary">
                <IoMdSend />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
