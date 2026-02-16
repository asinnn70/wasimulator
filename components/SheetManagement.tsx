
import React from 'react';
import { SheetRow, BotConfig } from '../types';

interface SheetManagementProps {
  data: SheetRow[];
  config: BotConfig;
}

const SheetManagement: React.FC<SheetManagementProps> = ({ data, config }) => {
  return (
    <div className="space-y-6">
      {/* Sheet Metadata Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 text-2xl">
            <i className="fa-solid fa-file-excel"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Connected Google Sheet</h3>
            <p className="text-sm text-slate-500 font-mono truncate max-w-xs">{config.sheetId}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
            Open Sheet
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-rotate mr-2"></i>
            Sync Now
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order Item</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Qty</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price (IDR)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                        {row.customerName.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{row.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.item}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{row.quantity}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{row.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 font-mono">{row.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      row.status === 'Processed' ? 'bg-blue-50 text-blue-600' :
                      row.status === 'Shipped' ? 'bg-green-50 text-green-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-slate-300 text-5xl mb-4">
              <i className="fa-solid fa-database"></i>
            </div>
            <p className="text-slate-500 font-medium">No order data synchronized yet</p>
            <p className="text-sm text-slate-400">Try sending an order in the Bot Simulator</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetManagement;
