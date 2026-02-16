
import React, { useState, useEffect, useCallback } from 'react';
import { Message, SheetRow, BotConfig } from './types';
import { extractSheetData, generateBotReply } from './services/geminiService';
import Sidebar from './components/Sidebar';
import BotSimulator from './components/BotSimulator';
import SheetManagement from './components/SheetManagement';
import ConfigPanel from './components/ConfigPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'sheets' | 'config'>('simulator');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Halo! Saya asisten otomatis Anda. Silakan kirim detail pesanan Anda.', timestamp: new Date() }
  ]);
  const [sheetData, setSheetData] = useState<SheetRow[]>([
    { id: '101', timestamp: '2024-05-20', customerName: 'Budi Santoso', item: 'Kopi Kenangan', quantity: 2, price: 25000, total: 50000, status: 'Processed' },
    { id: '102', timestamp: '2024-05-21', customerName: 'Siti Aminah', item: 'Roti Bakar', quantity: 1, price: 15000, total: 15000, status: 'Pending' }
  ]);
  const [config, setConfig] = useState<BotConfig>({
    sheetId: '1BxiMVs0XRA5nFMdKvBdBZjJWUUqWzWnITpBfLhDYXpk',
    targetSheet: 'Orders_2024',
    aiMode: 'Balanced',
    autoReply: true
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      // 1. Extract data using Gemini
      const data = await extractSheetData(text);
      
      if (data) {
        // 2. Update local "Sheet" state
        const newRow: SheetRow = {
          id: (Date.now() + 1).toString(),
          timestamp: new Date().toISOString().split('T')[0],
          customerName: data.customerName || 'Guest',
          item: data.item || 'N/A',
          quantity: data.quantity || 1,
          price: data.price || 0,
          total: data.total || (data.quantity * data.price) || 0,
          status: 'Pending'
        };
        setSheetData(prev => [newRow, ...prev]);

        // 3. Generate AI Reply
        if (config.autoReply) {
          const replyText = await generateBotReply(text, data);
          const botMsg: Message = { id: (Date.now() + 2).toString(), sender: 'bot', text: replyText, timestamp: new Date(), extractedData: data };
          setMessages(prev => [...prev, botMsg]);
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTab === 'simulator' && 'WhatsApp Bot Simulator'}
              {activeTab === 'sheets' && 'Google Sheets Synchronization'}
              {activeTab === 'config' && 'System Configuration'}
            </h1>
            <p className="text-sm text-slate-500">Integrasi cerdas WhatsApp & GSheets</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Connection
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <i className="fa-solid fa-bell"></i>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'simulator' && (
            <BotSimulator 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isProcessing={isProcessing} 
            />
          )}
          {activeTab === 'sheets' && (
            <SheetManagement data={sheetData} config={config} />
          )}
          {activeTab === 'config' && (
            <ConfigPanel config={config} setConfig={setConfig} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
