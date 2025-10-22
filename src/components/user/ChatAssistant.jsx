import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiFillRobot } from "react-icons/ai";
import { motion } from "framer-motion";
import { axiosInstance } from "../../utils/AxiosHelper";
import ExpenseView from "../../pages/user/ExpenseView";
function formatTime(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function simulateAssistantResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes("budget")) {
    return "To set a budget, decide your monthly limit, split it across categories, and track spends daily. I can help suggest category caps if you share recent expenses.";
  }
  if (lower.includes("save") || lower.includes("tips")) {
    return "Smart saving tip: Automate a small transfer on payday, review subscriptions, and use cash/UPI for discretionary spends to feel the outflow.";
  }
  if (lower.includes("report")) {
    return "I can summarize your spending by category, merchant, or time range. Tell me the period you want: e.g., 'last 7 days' or 'this month'.";
  }
  return `Here’s an insight related to your message: “${text}”. You can ask me for budgets, summaries, or ways to reduce overspending.`;
}

export const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I’m your assitant Michael. Ask me anything about your expenses, budgets, or savings.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const listRef = useRef(null);
  const textRef = useRef(null);

  const assistant = useMemo(
    () => ({
      name: "Michael",
      status: "Online",
      avatar: "🤖",
    }),
    []
  );

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    // Auto-grow textarea height
    const ta = textRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 140) + "px";
    ta.focus();
  }, [input]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Typing indicator
    setIsTyping(true);

    try {
      // Call backend assistant (GET with query as params)
      const { data } = await axiosInstance.get(`/ai/chat?query=${text}`);

      // Normalize response
      const operation = data?.operation || "unknown";
      let content;

      if (operation === "list_expense") {
        const items = Array.isArray(data?.result)
          ? data.result
          : Array.isArray(data?.data)
          ? data.data
          : [];
        content = {
          type: "expenses",
          message: data?.message || "Here are the expenses I found:",
          items,
        };
      } else if (operation === "add_expense") {
        content = data?.message || "Expense added successfully.";
      } else {
        content =
          data?.advisor_message ||
          data?.message ||
          "I couldn't understand the request. Please try again.";
      }

      const aiMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const aiMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I couldn't reach the assistant. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    
      <div className="rounded-2xl mx-auto border-t-4 border-blue-900 bg-white/80 backdrop-blur shadow-sm overflow-hidden hover:scale-102 mt-17">
        {/* Chat Header */}
        <div className="px-4 sm:px-6 py-3 border-b   flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center ring-1 ring-indigo-400/50">
              <AiFillRobot className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900  truncate">
                {assistant.name}
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 ">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {assistant.status}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-400">
            Secure • Private • Fast
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="h-[calc(100dvh-18rem)] sm:h-[calc(100dvh-20rem)] overflow-y-auto px-3 sm:px-5 py-4 bg-gradient-to-b from-slate-50/60 to-white "
        >
          <div className="space-y-3">
            {messages.map((m) => {
              const mine = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-3 py-2 shadow-sm ${
                      mine
                        ? "bg-emerald-600 text-white rounded-tr-sm"
                        : "bg-white text-gray-800 ring-1 ring-gray-200 rounded-tl-sm "
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {typeof m.content === "string" ? (
                        m.content
                      ) : m.content?.type === "expenses" ? (
                        <>
                          {m.content?.message && (
                            <div className="mb-2">{m.content.message}</div>
                          )}
                          {Array.isArray(m.content.items) &&
                          m.content.items.length > 0 ? (
                            <div className="space-y-3">
                              {m.content.items.map((exp, idx) => (
                                <ExpenseView
                                  key={exp?._id || exp?.id || idx}
                                  expense={exp}
                                  removeExpense={() => {}}
                                  onUpdateExpense={() => {}}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="text-gray-500">
                              No expenses found.
                            </div>
                          )}
                        </>
                      ) : (
                        m.content?.text ?? ""
                      )}
                    </div>
                    <div
                      className={`mt-1.5 text-[10px] ${
                        mine ? "text-emerald-100/80" : "text-gray-400"
                      }`}
                    >
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-2xl px-3 py-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-tl-sm dark:bg-neutral-900 dark:ring-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <div className="mt-1.5 text-[10px] text-gray-400">
                    typing…
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="px-3 sm:px-5 py-3 border-t border-gray-900 my-auto bg-white/90 ">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                ref={textRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Message the assistant…"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/60 "
              />
              <div className="mt-1 text-[11px] text-gray-400">
                Press Enter to send • Shift + Enter for new line
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400/50 transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed mb-5"
              title="Send"
              aria-label="Send message"
            >
              <FiSend className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    
  );
};
