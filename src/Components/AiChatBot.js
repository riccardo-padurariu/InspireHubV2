import React from "react";
import '../Styles/AiChatBot.css';
import ai from  '../Assets/mingcute_ai-fill.svg';
import ChatBotMessage from "./ChatBotMessage";
import ChatForm from "./ChatForm";
import { doc } from "firebase/firestore";
import AddFeedback from "./AddFeedback";
import { useEffect,useRef } from 'react';
import { aiInfo } from "../AIInfo";

export default function AiChatBot() {

  const [chatHistory,setChatHistory] = React.useState([{
    hideInChat: true,
    role: 'model',
    text: aiInfo
  }]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const chatMessages = chatHistory.map((chat, index) => 
    <ChatBotMessage key={index} chat={chat} />
  );

  const generateBotResponse = async (history) => {

    const updateHistory = (text) => {
      setChatHistory((prev) => [...prev.filter(msg => msg.text !== 'Thinking...'), {role: 'bot', text}]);
    }
    history = history.map(({role,text}) => ({role: role === 'user' ? 'user' : 'model', parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({contents: history}),
    }

    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD7pNbxmB2o4EaaHFEIEkguX_H_Z1cuv0U';

    try{
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error('Failed to generate response');

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
      updateHistory(apiResponseText);

      console.log(data);
    }catch(error){
      console.error('Error generating response:', error);
    }
  }

  window.addEventListener('resize',() => {
    document.querySelector('.chatbot-container').style.height = window.innerHeight - 325 + 'px';
  })

  const standardHeight = 695;
  const maxHeight = 2780;

  const portion = (maxHeight-standardHeight)/33;

  return(
    <div>
      <div className="chatbot-container" style={{height: `${window.innerHeight - 325}px`}}>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <img className="ai-img-chatbot" src={ai}></img>
            <p className="message-text">Hey there!How can I help you?</p>
          </div>

          {chatMessages}

        </div>

        <ChatForm setChatHistory={setChatHistory} chatHistory={chatHistory} generateBotResponse={generateBotResponse}/>

      </div>
    </div>
  );
}