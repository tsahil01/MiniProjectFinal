"use client";

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';

const socket = io("http://ec2-54-157-211-37.compute-1.amazonaws.com:5000/");

function Rooms({ roomId, h, w }: { roomId: any, h: any, w: any}) {
  const [text, setText] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    return () => {
    //   socket.disconnect();
    };
  }, [roomId]);

  const handleInputChange = (e:any) => {
    const text = e;
    setText(text);
    socket.emit('textInput', { roomId, text });
  };

  useEffect(() => {
    socket.on('textInput', (text) => {
        // console.log("incoming text: ", text);
      setText(text);
    });

    return () => {
      socket.off('textInput');
    };
  }, []);

  return (
    <div className={`w-[${w}]vw m-auto overflow-hidden`}>
        <Editor
          className=''
            height={h}
            width={'100%'}
            defaultLanguage="cpp"
            theme="vs-dark"
            value={text}
            onChange={handleInputChange}
            defaultValue="// Write your code here"
            loading={<h3>Loading Code..</h3>}
            options={{
              automaticLayout: true,
              glyphMargin: true,
            }}
          />
    </div>

  );
}

export default Rooms;

