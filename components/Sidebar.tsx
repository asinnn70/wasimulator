
import React from 'react';

interface SidebarProps {
  activeTab: 'simulator' | 'sheets' | 'config';
  setActiveTab: (tab: 'simulator' | 'sheets' | 'config') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'simulator', label: 'Bot Simulator', icon: 'fa-comments' },
    { id: 'sheets', label: 'GSheet Data', icon: 'fa-table' },
    { id: 'config', label: 'Configuration', icon: 'fa-gear' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl">
          <i className="fa-brands fa-whatsapp"></i>
        </div>
        <span className="font-bold text-lg text-white">WA-Sheet</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usage Limit</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mb-2">
            <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400">750 / 1000 AI Extractions used</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
