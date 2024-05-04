import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // ye vhi user h jo protectRoute me DB se find krke bnaye h (line 16).(can say:- current loggedin user)

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id); // jitni baar message krege new msgId generate ho rha(message collection me dekh skte h) aur vhi msgId conversation ke messages array me store kr rhe,,, phir issi all msgId ka actual message kya h vo populate krke nikaal rhe h populate method se.
        }
        // not run parallelally
        // await conversation.save();  // agr 1 second le rha
        // await newMessage.save();  // to isko 1 second tak wait krna prega.

        await Promise.all([conversation.save(), newMessage.save()]); // ye parallelly run krega.

        // Socket IO yhi pe aayega.  jo bhi newMessage user krega vo database me to store hoga hi per ab socket ke help se receiver user ko bhej de rhe h.
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getMessages = async(req, res) => {
    try {
        const { id: userToChat } = req.params; // id esliye kuki route bnate time id hi likhe h.
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] },
        }).populate("messages"); // populate method ky krega ki conversation collection me jo messages array h jisme messageId store hai,,, unka actual message content dikha dega mtlb uss messageId ka.
        if (!conversation) {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage", error.message);
        res.status(500).json({ error: error.message });
    }
};