import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../components/context/useGetMessage.js";
import LoadingSkeleton from "../../skeleton/LoadingSkeleton.jsx";
import useGetLiveSocketMessages from "../../components/context/useGetLiveSocketMessages.js";
function Messages() {
  const { loading, messages } = useGetMessage();
  useGetLiveSocketMessages(); // just listening any incoming messages
  // console.log(messages);
  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <>
      <div className="overflow-hidden ">
        <div
          className="flex-1 overflow-y-auto"
          style={{ minHeight: "calc(92vh - 8vh)" }}
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            messages.length > 0 &&
            messages.map((message) => (
              <div key={message._id} ref={lastMsgRef}>
                <Message message={message} />
              </div>
            ))
          )}

          {!loading && messages.length === 0 && (
            <div>
              <p className="text-center mt-[20%] text-white">
                Say! Hi to start the conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;
