import { useCallback, useEffect, useRef, useState } from "react";
import { socket, socketContext, SOCKET_EVENT } from "./service/socket";

import NicknameForm from "./components/NicknameForm";
import ChatRoom from "./components/ChatRoom";
import MessageForm from "./components/ChatRoom/MessageForm";

function App() {
  const prevNickname = useRef<string | null>(null);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    socket.emit(SOCKET_EVENT.UPDATE_NICKNAME, {
      prevNickname: prevNickname.current,
      nickname
    });
  }, [prevNickname.current]);

  useEffect(() => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { nickname });
  }, [nickname]);

  return (
    <socketContext.Provider value={socket}>
      <div className="w-full justify-center items-center mt-5">
        <NicknameForm handleSumbitNickname={useCallback(newNickname => {
          prevNickname.current = nickname;
          setNickname(newNickname);
        }, [nickname])} />
        <ChatRoom nickname={nickname} />
        <MessageForm nickname={nickname} />
      </div>
    </socketContext.Provider>
  );
};

export default App;