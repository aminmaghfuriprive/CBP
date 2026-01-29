
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, Button } from '@cbp/ui';
import { askLegalAssistant } from '@cbp/core';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function LegalAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Halo. Saya asisten legal virtual CBP Corp. Ada dokumen atau pasal yang perlu saya analisis?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askLegalAssistant(input);
    
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Asisten AI</h1>
        <p className="text-slate-500 dark:text-slate-400">Konsultasi cepat dan ringkasan dokumen hukum.</p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900" padding={false}>
        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border shadow-sm ${msg.role === 'user' ? 'bg-slate-900 border-slate-900 ml-3 dark:bg-cbp-gold dark:border-cbp-gold' : 'bg-white border-slate-200 mr-3 dark:bg-slate-800 dark:border-slate-700'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-white dark:text-slate-900" /> : <Bot className="h-4 w-4 text-cbp-gold" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none dark:bg-cbp-gold dark:text-slate-900' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'}`}>
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row items-center bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 ml-11">
                <Loader2 className="h-4 w-4 animate-spin text-cbp-gold mr-2" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Sedang mengetik...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="Ketik pertanyaan hukum..."
              className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cbp-gold/50"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="w-14 px-0 rounded-lg">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
