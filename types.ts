
export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  extractedData?: Record<string, any>;
}

export interface SheetRow {
  id: string;
  timestamp: string;
  customerName: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
  status: 'Pending' | 'Processed' | 'Shipped';
}

export interface BotConfig {
  sheetId: string;
  targetSheet: string;
  aiMode: 'Strict' | 'Creative' | 'Balanced';
  autoReply: boolean;
}
