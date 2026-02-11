"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Take a moment. What part of this situation feels the most draining right now?",
      };
      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#eef2f7] to-[#f9fafb] px-4">

      {/* FLOATING NAVBAR */}
      <div className="w-full max-w-5xl mt-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              🌿 Extress
            </h1>
            <p className="text-xs text-gray-500">clarity over chaos</p>
          </div>
          <span className="text-xs text-gray-400">
            Private · Calm · Focused
          </span>
        </div>
      </div>

      {/* MAIN CHAT CARD */}
      <div className="w-full max-w-5xl flex-1 mt-6 mb-8 bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <p className="text-sm text-gray-600">
            This is your space. Say whatever’s on your mind.
          </p>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 no-scrollbar">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-60 animate-fade-in">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border flex items-center justify-center mb-6 text-3xl">
                ✨
              </div>
              <p className="text-gray-500 text-sm">
                Start by sharing what’s been weighing on you.
              </p>
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex animate-fade-in ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gray-100 px-5 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-soft-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-soft-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-soft-bounce delay-300"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="What’s going on in your head right now?"
              className="flex-1 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/10 outline-none text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="px-7 rounded-xl bg-black text-white text-sm font-semibold shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p className="text-xs text-gray-400 mb-6 text-center max-w-xl">
        Extress is not a medical or therapy service — it’s a calm space to reflect,
        release stress, and regain clarity.
      </p>
    </main>
  );
}
