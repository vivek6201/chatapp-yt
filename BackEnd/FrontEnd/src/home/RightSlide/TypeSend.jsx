import React, { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../components/context/useSendMessage.js";

import io from "socket.io-client";
import useConversation from "../../zustand/useConversation.js";

function TypeSend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log(selectedConversation);

  const handleSubmit = async (e) => {
    console.log(e.target.value);

    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="h-[8%] mt-auto bg-slate-800">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                // handleTyping();
              }}
              className="input input-bordered w-full mx-4 mt-3"
            />
            <button type="submit">
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <IoSend className="text-3xl mt-2 cursor-pointer text-gray-300 mr-2" />
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TypeSend;
