import { IoIosCloseCircle, IoMdAdd } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDeleteOutline, MdChatBubbleOutline, MdLogout } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat, selected } = ChatData();
  const { logoutHandler, user } = UserData();

  const deleteChatHandler = (id, e) => {
    e.stopPropagation();
    if (confirm("Delete this conversation?")) {
      deleteChat(id);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#121214] border-r border-[#27272a] transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Mobile Close Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white"
      >
        <IoIosCloseCircle size={24} />
      </button>

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">AI</span>
            </div>
            <span className="font-semibold text-white tracking-tight">Nexus AI</span>
          </div>

          <button
            onClick={createChat}
            className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-slate-200 transition-colors py-2.5 rounded-lg font-medium text-sm"
          >
            {createLod ? <LoadingSpinner color="border-black" /> : <><IoMdAdd size={18} /> New Chat</>}
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 thin-scrollbar">
          <div className="mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            History
          </div>

          <div className="space-y-1">
            {chats && chats.length > 0 ? (
              chats.map((e) => (
                <div
                  key={e._id}
                  onClick={() => {
                    setSelected(e._id);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${selected === e._id
                    ? "bg-[#27272a] text-white"
                    : "text-slate-400 hover:bg-[#1f1f22] hover:text-slate-200"
                    }`}
                >
                  <MdChatBubbleOutline className={selected === e._id ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-500"} />
                  <span className="truncate text-sm flex-1 font-medium">
                    {e.title || (e.latestMessage ? e.latestMessage.slice(0, 30) : "New Chat")}
                  </span>

                  <button
                    onClick={(event) => deleteChatHandler(e._id, event)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity p-1"
                    title="Delete Chat"
                  >
                    <MdDeleteOutline size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="px-3 py-8 text-center text-slate-600 text-sm">
                No conversations yet.
              </div>
            )}
          </div>
        </div>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-[#27272a] bg-[#0f0f12]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-sm font-semibold border border-indigo-500/20">
                {user?.name?.[0] || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200 truncate max-w-[100px]">{user?.name}</span>
                <span className="text-xs text-slate-500 truncate max-w-[100px]">Pro Plan</span>
              </div>
            </div>
            <button
              onClick={logoutHandler}
              className="p-2 text-slate-500 hover:text-white transition-colors"
              title="Logout"
            >
              <MdLogout size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
