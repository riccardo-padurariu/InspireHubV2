import React from "react";
import send from '../Assets/Vector.svg';


export default function ChatForm(props){

  const [msj,setMsj] = React.useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = msj;
    if(!userMessage) return;

    setMsj('');

    props.setChatHistory((history) => [...history,
      { 
        role: 'user',
        text: userMessage
      }
    ]);

    setTimeout(() => {
      props.setChatHistory((history) => [...history,
          { 
            role: 'bot',
            text: 'Thinking...'
          }
        ]
      );
      props.generateBotResponse([...props.chatHistory, {role: 'user',    text: userMessage}]);
    }
    ,600);
  }

  return (
    <form className="chat-footer" onSubmit={handleFormSubmit}>
      <input type="text" placeholder="Tell Astra what's on your mind!" className="input-chatbot" value={msj} onChange={(e) => setMsj(e.target.value)}></input>
      <button className="send-text-button">
        <img className="img-send" src={send}></img>
      </button>
    </form>
  );
}