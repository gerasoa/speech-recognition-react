import React, { useState } from 'react';
import './App.css';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from 'speech-recognition-polyfill';

const appId = '390920e1-a155-45cf-89f1-333f740ef5ed';
const SpeechlySpeechRecognation = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognation);


function App() {
  const commands = [
    { command: 'hello', callback: () => console.log('Hello!') },
    { command: 'goodbye', callback: () => console.log('Goodbye!') },
    { command: 'good bye', callback: () => console.log('Good bye!') },
    { command: 'Hi', callback: () => console.log('Hi!') },
    {
      command: ['tomorrow', 'today'],
      callback: ({ command }) => console.log(`Hi there! You said: "${command}"`)
    },
    {
      command: ['one', 'four'],
      callback: ({ command }) => {
        return console.log(`Hi there! You said: "${command}"`);
      },
      //matchInterim: true
    },
    {
      command: 'clear',
      callback: () => {resetTranscript()}
    }
  ];

  const [text, setText] = useState("");
  const {
    transcript,
    //interimTranscript,
    //finalTranscript,
    resetTranscript,
    listening,
    supported,
  } = useSpeechRecognition({
    commands,
    onResult: (result) => {
      setText(result);
    }, interimResults: false,
    continuous: true
  });

  function isMicrophoneAvailable() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => true)
      .catch(() => false);
  }

  /*
  function isBrowserSupportsContinuousListening() {
    if (useSpeechRecognition.browserSupportsContinuousListening) {
      SpeechRecognition.startListening({ continuous: true })
      continuousListeningMessage = 'Continuous listening: on';
    } else {
      continuousListeningMessage = 'Continuous listening not suported';
    }
  }
  */

  return (
    <div>     
      <p id='transcript'>transcript: {transcript}</p>

      {isMicrophoneAvailable ?
        <p>Microphone Available: yes</p>
        :
        <p>Microphone Available: <span className='pred'>no</span></p>
      }
      
      {useSpeechRecognition.browserSupportsContinuousListening ?
        <p>Browser Supports Continuous Listening: yes</p>
        :
        <p>Browser Supports Continuous Listening: <span className='pred'>no</span></p>
      }

      {supported ?
        <p>Browser support Microphone: yes</p>
        :
        <p>Browser support Microphone: <span className='pred'>no</span></p>
      }

      {listening ?
        //<p>Ouvindo...</p>
        <button className='button_stop' onClick={SpeechRecognition.stopListening}>Stop</button>
        :
        <button onClick={SpeechRecognition.startListening}>Start</button>}
        <br /><br/>
        <button onClick={resetTranscript}>clear</button>

    </div >
  );
}

export default App;
