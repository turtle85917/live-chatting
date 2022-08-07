"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SOCKET_EVENT = { JOIN_ROOM: "JOIN_ROOM", UPDATE_NICKNAME: "UPDATE_NICKNAME", SEND_MESSAGE: "SEND_MESSAGE", RECEIVE_MESSAGE: "RECEIVE_MESSAGE" };
exports.default = (socket) => {
    socket.on("connection", (socket) => {
        console.log("Connect.");
        const roomName = "room 1";
        Object.entries(SOCKET_EVENT).forEach(([_, type]) => {
            socket.on(type, (requestData) => {
                const firstVisit = type === SOCKET_EVENT.JOIN_ROOM;
                if (firstVisit)
                    socket.join(roomName);
                const responseData = Object.assign(Object.assign({}, requestData), { type, time: new Date() });
                socket.to(roomName).emit(SOCKET_EVENT.RECEIVE_MESSAGE, responseData);
                console.log(`${type} is fired with data: ${JSON.stringify(responseData)}`);
            });
        });
        socket.on("disconnect", (reason) => {
            console.log(`Disconnnect : ${reason}`);
        });
    });
};
//# sourceMappingURL=index.js.map