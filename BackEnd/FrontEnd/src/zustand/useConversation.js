// isme uss user ka info aayega jiska conversation select krege mtlb jispe click krege vhi user store ho jayega.
// User.jsx mein iski current state set kiye h. line 5

import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;