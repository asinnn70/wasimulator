
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface BotSimulatorProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
}

const BotSimulator: React.FC<BotSimulatorProps> = ({ messages, onSendMessage, isProcessing }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Simulation Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <i className="fa-solid fa-user"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Test Customer</h3>
            <p className="text-xs text-green-600 font-medium">Online</p>
          </div>
        </div>
        <div className="flex gap-4 text-slate-400">
          <i className="fa-solid fa-phone"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#e5ddd5] bg-opacity-10">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm relative ${
                msg.sender === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              {msg.extractedData && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 italic">
                  Data extracted: {msg.extractedData.item} ({msg.extractedData.quantity}x)
                </div>
              )}
              <span className={`block text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex gap-3">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fa-regular fa-face-smile text-xl"></i>
          </button>
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fa-solid fa-paperclip text-xl"></i>
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder="Type a message (e.g. 'Halo saya Budi mau pesan 2 nasi goreng harga 15rb')"
            className="flex-1 bg-white border border-slate-200 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:bg-slate-100"
          />
          <button 
            type="submit" 
            disabled={isProcessing || !inputText.trim()}
            className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 disabled:bg-slate-300 transition-all shadow-md shadow-emerald-500/20"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BotSimulator;
