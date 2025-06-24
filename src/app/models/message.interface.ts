export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  metadata?: {
    isLoading?: boolean;
    error?: string;
    actions?: MessageAction[];
  };
}

export interface MessageAction {
  id: string;
  label: string;
  type: 'button' | 'link';
  action: string;
  url?: string;
} 