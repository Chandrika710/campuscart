import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShoppingCart,
  Eye,
  CornerDownLeft,
  ChevronDown,
} from 'lucide-react';
import { Product } from '../types';
import { queryCampusCartAI, AssistantResponse } from '../utils/aiAssistant';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  matchedProducts?: Product[];
  timestamp: string;
}

interface CampusCartAIProps {
  isOpen: boolean;
  onToggle: () => void;
  products: Product[];
  onViewProductDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const SUGGESTED_QUERIES = [
  'Find textbooks under ₹300',
  'Recommend CSE books',
  'Find scientific calculators',
  'Compare two products',
  'Show items in good condition',
  'Suggest items for a new semester',
];

export const CampusCartAI: React.FC<CampusCartAIProps> = ({
  isOpen,
  onToggle,
  products,
  onViewProductDetails,
  onAddToCart,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'Hey there! I am CampusCart AI, your campus marketplace discovery assistant. Ask me to find textbooks by budget, recommend semester starter kits, or locate calculators from fellow classmates!',
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Fast local catalogue query
    setTimeout(() => {
      const response: AssistantResponse = queryCampusCartAI(query, products);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.message,
        matchedProducts: response.matchedProducts,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#FF6A00] hover:bg-[#FF8C42] text-white shadow-xl shadow-[#FF6A00]/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-semibold text-xs border border-[#FF8C42]/50"
          title="Open CampusCart AI Assistant"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span>Ask CampusCart AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] bg-[#171717] border border-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#0B0B0B] border-b border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8C42] flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  CampusCart AI
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#FF6A00]/20 text-[#FF8C42]">
                    Catalog Engine
                  </span>
                </h3>
                <span className="text-[10px] text-[#A3A3A3] block">
                  Grounds strictly on actual listings
                </span>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#121212]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/40 flex items-center justify-center text-[#FF8C42] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6A00] text-white font-medium ml-auto'
                      : 'bg-[#1C1C1C] border border-[#2A2A2A] text-stone-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Matched Product Cards */}
                  {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[#2A2A2A]">
                      {msg.matchedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-2 rounded-lg bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] text-[#FF8C42] font-semibold block uppercase">
                              {p.category}
                            </span>
                            <div className="text-white font-semibold truncate text-[11px]">{p.name}</div>
                            <div className="text-[#A3A3A3] text-[10px]">
                              ₹{p.price} · {p.condition}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => onViewProductDetails(p)}
                              className="p-1.5 text-[#A3A3A3] hover:text-white bg-[#171717] rounded cursor-pointer"
                              title="View details"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onAddToCart(p)}
                              className="p-1.5 text-white bg-[#FF6A00] hover:bg-[#FF8C42] rounded cursor-pointer"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#A3A3A3] italic pl-9">
                <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full animate-bounce" />
                <span>Searching catalog listings...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-[#0B0B0B] border-t border-[#2A2A2A] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-md bg-[#171717] hover:bg-[#2A2A2A] border border-[#2A2A2A] text-[#A3A3A3] hover:text-white text-[10px] font-medium transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0B0B0B] border-t border-[#2A2A2A] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about textbooks, calculators, budget..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#171717] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs placeholder-[#A3A3A3] focus:outline-none focus:border-[#FF6A00]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 bg-[#FF6A00] hover:bg-[#FF8C42] disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
