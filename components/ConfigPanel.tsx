
import React from 'react';
import { BotConfig } from '../types';

interface ConfigPanelProps {
  config: BotConfig;
  setConfig: React.Dispatch<React.SetStateAction<BotConfig>>;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">General Settings</h3>
          <button className="text-emerald-500 text-sm font-bold hover:underline">Reset to Default</button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Google Sheet ID</label>
              <input 
                type="text" 
                value={config.sheetId}
                onChange={(e) => setConfig({...config, sheetId: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <p className="text-[10px] text-slate-400 italic">Found in your Google Sheet URL</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Target Sheet Name</label>
              <input 
                type="text" 
                value={config.targetSheet}
                onChange={(e) => setConfig({...config, targetSheet: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <p className="text-[10px] text-slate-400 italic">Example: "Sheet1" or "Orders"</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">AI Auto-Reply</h4>
              <p className="text-xs text-slate-500">Enable Gemini to automatically respond to customers</p>
            </div>
            <button 
              onClick={() => setConfig({...config, autoReply: !config.autoReply})}
              className={`w-12 h-6 rounded-full transition-all relative ${config.autoReply ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.autoReply ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">AI Reasoning Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Strict', 'Balanced', 'Creative'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setConfig({...config, aiMode: mode})}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    config.aiMode === mode 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">Controls how strictly Gemini extracts data from natural language.</p>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-900/10">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-emerald-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-xl shadow-emerald-600/20">
        <div>
          <h3 className="font-bold text-lg">Export Script</h3>
          <p className="text-sm text-emerald-100 opacity-80">Copy the Google Apps Script to your sheet to enable real-time sync.</p>
        </div>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition-all border border-white/20">
          <i className="fa-solid fa-copy mr-2"></i>
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;
