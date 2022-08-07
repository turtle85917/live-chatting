import { Component } from "react";

interface P {
  handleSumbitNickname: (nickname: string) => void;
}

interface S {
  nickname: string;
  change: boolean;
}

export default class NicknameForm extends Component<P, S> {
  constructor(props: P) {
    super(props);
  }

  componentDidMount(): void {
    this.setState({ nickname: "", change: false });
  }

  render() {
    return (
      <form id="nickname">
        <div className="rounded-lg overflow-hidden shadow-lg px-6 py-4">
          <label className="text-gray-700 text-base font-bold mr-1" style={{ width: 60 }}>닉네임</label>
          {
            this.state?.change
            ? (<>은 더 이상 바꿀 수 없습니다.</>)
            : (<>
              <input
                type="text"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
                id="user-name-input"
                maxLength={12}
                autoComplete={"off"}
                onChange={(event) => {
                  this.setState({ nickname: event.currentTarget.value });
                }} />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                onClick={(event) => {
                  if (!this.state?.nickname.trim()) return;

                  this.props.handleSumbitNickname(this.state?.nickname.trim() || "GUEST");
                  this.setState({ nickname: "", change: true });
              }} >확인</button>
            </>)
          }
        </div>
      </form>
    )
  };
};