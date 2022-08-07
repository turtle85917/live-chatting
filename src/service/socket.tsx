import { createContext } from "react";
import socketIo from "socket.io-client";

export const socket = socketIo(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });
export const socketContext = createContext(socket);
export const SOCKET_EVENT = { JOIN_ROOM: "JOIN_ROOM", UPDATE_NICKNAME: "UPDATE_NICKNAME", SEND_MESSAGE: "SEND_MESSAGE", RECEIVE_MESSAGE: "RECEIVE_MESSAGE" };

export const makeMessage = (pongData: IPingPongData): IMessage => {
  const { prevNickname, nickname, content, type, time } = pongData;

  let nicknameLabel = "";
  let contentLabel: string | undefined = undefined;

  switch (type) {
    case SOCKET_EVENT.JOIN_ROOM: {
      if (nickname) contentLabel = `앗! 야생의 ${nickname || "GUEST"} 님이 나타났다!\n 🎈 참고로 이름을 한 번 바꾸셔야 활동이 가능합니다.`;
      break;
    }
    case SOCKET_EVENT.UPDATE_NICKNAME: {
      if (prevNickname) contentLabel = `${prevNickname} 님의 이름이 바뀌었습니다. : ${nickname}.`;
      break;
    }
    case SOCKET_EVENT.SEND_MESSAGE: {
      contentLabel = String(content);
      nicknameLabel = nickname;
      break;
    }
    default:
  }

  let createdAt = new Date(time);
  let am = createdAt.getHours() < 13;

  return {
    nickname: nicknameLabel,
    content: contentLabel,
    time: `${am ? "오전" : "오후"} ${(createdAt.getHours() - 12).toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`
  };
};

socket.on("connect", () => {
  console.log("Socket server connected");
});

socket.on("disconnect", () => {
  console.log("Socket server disconnected");
});