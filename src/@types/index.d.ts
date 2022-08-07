type IPingPongData = {
  prevNickname?: string;
  nickname: string;
  content?: string;
  type: const;
  time: string;
};

type IMessage = {
  nickname?: string;
  content?: string;
  time: string;
};