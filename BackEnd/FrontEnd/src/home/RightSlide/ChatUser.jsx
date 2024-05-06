import React from "react";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../components/context/useGetUsers";
import { useSocketContext } from "../../components/context/SocketContext";
import { useAuth } from "../../components/context/AuthProvider";
import { getInitials } from "../../utils/utils";
import { CiMenuFries } from "react-icons/ci";

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getUserOnlineStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <>
      <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white"/>
        </label>
        <div className="w-10 my-2 flex items-center justify-center aspect-square rounded-full online bg-gray-500">
          <p className="text-white">
            {getInitials(selectedConversation.fullName)}
          </p>
        </div>
        <div>
          <h3 className="text-xl">{selectedConversation.fullName}</h3>
          <span className="text-sm">
            {" "}
            {getUserOnlineStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </>
  );
}

export default ChatUser;
