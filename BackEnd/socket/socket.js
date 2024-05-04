import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Socket } from "dgram";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

// it's for realtime messages code. export esliye kuki controller me isko use krege.
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // user ka online status k liye below code h, frontend se uska id leke yha socket wala connect user se match krke dekh rhe.
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(userSocketMap);
    }
    // used to send the event to all connected users
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    // used to listen events, both server and client side.
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    });
});

export { app, io, server };