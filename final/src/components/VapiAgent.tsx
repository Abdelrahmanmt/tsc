/// <reference lib="dom" />
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Vapi from '@vapi-ai/web';

interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: CustomSpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface CustomSpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
    item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

const vapi = new Vapi('7b2422cb-d622-47b4-b6b7-38e8cb567ec1');

const VapiAgent = () => {
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition: CustomSpeechRecognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          console.log("Transcript:", transcript);

          if (transcript.toLowerCase().includes('hello')) {
            console.log('Wake word detected!');
            recognition.stop();
            setIsListening(false);
            vapi.start('ae62d6ef-2748-4027-b79c-b407a45c384f');
          }
        };

        recognition.start();

        return () => {
          recognition.stop();
          vapi.stop();
        };
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-white/20">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <p className="text-white text-sm">
            {isListening ? 'Listening...' : 'Say "Hello" to Start'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VapiAgent; 