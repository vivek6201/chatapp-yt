import React, { useEffect } from "react";
import ChatUser from "./ChatUser.jsx";
import Messages from "./Messages";
import TypeSend from "./TypeSend.jsx";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../components/context/AuthProvider.jsx";

const NewConversation = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // const isChatSelected = true;

  // useEffect using as bcoz login krne pe chat close rhe.
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  console.log(selectedConversation);
  return (
    <div>
      <div className="">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <ChatUser />
            <div
              className="flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <TypeSend className="" />
          </>
        )}
      </div>
    </div>
  );
};

export default NewConversation;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome <span className="font-bold text-xl">{authUser.fullName}</span>
          <br />
          No chat selected, please start conversation by selecting anyone to
          your contacts
        </h1>
      </div>
    </>
  );
};
