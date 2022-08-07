import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { makeMessage, socketContext, SOCKET_EVENT } from "../../service/socket";

interface P {
  nickname: string;
}

export default function ChatRoom({ nickname }: P) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const chatWindow = useRef<HTMLDivElement | null>(null);
  const socket = useContext(socketContext);

  const moveScrollToReceiveMessage = useCallback(() => {
    chatWindow.current?.scrollTo({
      top: chatWindow.current?.scrollHeight,
      behavior: "smooth"
    });
  }, []);

  const handleReceiveMessage = useCallback((pongData: IPingPongData) => {
    const newMessage: IMessage = makeMessage(pongData);
    if (newMessage.content) {
      setMessages(messages => [...messages, newMessage]);
      moveScrollToReceiveMessage();
    }
  }, [moveScrollToReceiveMessage]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE_MESSAGE, handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  return (
    <div className="block mt-8">
      <div className="ml-1 font-bold">
        {
          nickname 
          ? (<><span>{nickname}</span> 님 환영합니다!</>)
          : (<>이름을 변경해주세요.</>)
        }
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg px-6 py-4" ref={chatWindow}>
        {messages.map((message, idx) => (
          <div key={idx} className="flex">
            {message.nickname && <div className="font-bold mr-3">{message.nickname}</div>}
            <div>
              <pre>{message.content}</pre>
            </div>
            <div className="text-xs ml-2 mt-1 text-gray-500">{message.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}   