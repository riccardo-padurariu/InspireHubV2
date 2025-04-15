import React from "react";
import ai from  '../Assets/mingcute_ai-fill.svg';


export default function ChatBotMessage(props){
  return (
    !props.chat.hideInChat && (
      <div className={`${props.chat.role}-div`}>
        <div className={`message ${props.chat.role}-message`}>
          {props.chat.role === 'bot' && <img className="ai-img-chatbot" src={ai}></img>}
          <p className="message-text">{props.chat.text}</p>
        </div>
      </div>
    )
  );
}