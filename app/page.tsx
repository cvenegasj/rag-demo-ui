"use client";

import { apiUrl } from "./shared/constants";
import { useState } from "react";

import { MessageList, Input, Button } from "react-chat-elements";


export default function Home() {

  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async (message: string) => {
    console.log('Message to sent: ' + message);

    setMessages(messages => [...messages, {position: 'left', type: 'text', title: 'Tu', text: message}]);

    const apiResponse = await fetch(`${apiUrl}/ask?q=${encodeURIComponent(message)}`).then(res => res.text());
    console.log(apiResponse);

    if (apiResponse) {
      setMessages(messages => [...messages, {position: 'right', type: 'text', title: 'GPT4', text: apiResponse}]);
      setInputText('');
    }
  }; 
  

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col items-center w-[950px] mx-auto">

        <h1 className="w-full text-center font-bold text-4xl text-cyan-800 font-[family-name:var(--font-geist-mono)]">
          Ask GPT!
        </h1>

        <div className="w-full h-[300px] overflow-y-scroll border">

          <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={messages}
          />
        </div>

        <div  className="w-full  border">
          
          <Input
            placeholder="Escribe aqui..."
            value={inputText}
            onChange={(e: any) => setInputText(e.target.value)}
            rightButtons={
              <Button text="Enviar" onClick={() => sendMessage(inputText)} />
            }
          />

        </div>

      </main>

    </div>
  );
}
