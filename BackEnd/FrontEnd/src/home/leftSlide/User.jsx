import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../components/context/SocketContext.jsx";

function User({ users }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSeleted = selectedConversation?._id === users._id;

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(users._id);

  return (
    <>
      <div
        className={` hover:bg-slate-600 duration-300 ${
          isSeleted ? "bg-slate-600" : ""
        }`}
        onClick={() => setSelectedConversation(users)}
      >
        <div className="m-6 px-6 py-2 flex items-center gap-4 cursor-pointer">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 rounded-full">
              <img src="https://images.pexels.com/photos/10498637/pexels-photo-10498637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
          </div>
          <div>
            <h3 className="font-bold">{users.fullName}</h3>
            <span className="text-sm">{users.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
