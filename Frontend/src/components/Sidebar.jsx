import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat, selected } = ChatData();

  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("are you sure you want to delete this chat")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    if (id) {
      setSelected(id);
      toggleSidebar();
    } else {
      console.warn("Invalid chat ID provided to clickEvent");
    }
  };
  return (
    <div
      className={`fixed inset-0 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block backdrop-blur-xl bg-white/60 border-r border-slate-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="md:hidden p-2 mb-4 rounded text-2xl bg-white/80 hover:bg-white transition border border-slate-200"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">ChatBot</span>
      </div>
      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-2 btn-primary"
        >
          {createLod ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar pr-1">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className={`group w-full text-left py-2 px-3 rounded mt-2 flex justify-between items-center transition border ${
                  selected === e._id
                    ? 'bg-sky-100 border-sky-300'
                    : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => clickEvent(e._id)}
              >
                <span className={`truncate ${selected === e._id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {e.latestMessage ? e.latestMessage.slice(0, 38) + '...' : 'No messages yet'}
                </span>
                <button
                  className="text-xl px-3 py-2 btn-outline-danger"
                  onClick={() => deleteChatHandler(e._id)}
                >
                  <MdDelete />
                </button>
              </button>
            ))
          ) : (
            <p className="text-slate-500">No chats yet</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 mb-6 w-full">
        <div className="flex justify-end">
          <button
            className="text-sm px-3 py-2 btn-danger"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
