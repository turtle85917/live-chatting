import { useContext, useState } from "react";
import { socketContext, SOCKET_EVENT } from "../../service/socket";

interface P {
  nickname: string;
}

export default function MessageForm({ nickname }: P) {
  const [ typingMessage, setTypingMessage ] = useState<string>("");
  const socket = useContext(socketContext);

  const handleSendContent = () => {
    const content = typingMessage.trim();
    if (!content) {
      return;
    }

    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      nickname, content
    });
    setTypingMessage("");
    (document.querySelector("textarea#content") as HTMLTextAreaElement).value = "";
  };

  return (
    <form className="rounded-lg overflow-hidden shadow-lg px-6 py-5 absolute left-0 bottom-0 w-full border-x-0">
      <div className="flex items-center">
        <textarea
          className="resize-none shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1 w-full"
          id="content"
          maxLength={400}
          autoFocus
          onChange={(event) => {
            setTypingMessage(event.currentTarget.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              if (nickname) handleSendContent();
              event.preventDefault();
            }
          }}
          placeholder="메시지 보내기" />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full h-12 w-12 mx-auto my-auto text-sm pl-3 py-2.5 mr-2 ml-2"
            onClick={handleSendContent} >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-45 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
      </div>
    </form>
  );
}