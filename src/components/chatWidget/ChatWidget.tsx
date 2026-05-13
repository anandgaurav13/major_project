"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ChatWidget.module.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your BBAU Campus Assistant. How can I help you navigate the campus today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Speech Recognition ──────────────────────────────── */
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SR =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (e: any) => {
        setInputText(e.results[0][0].transcript);
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  /* ── Auto-scroll ─────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ── Focus input when panel opens ───────────────────── */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  /* ── Bot knowledge base ──────────────────────────────── */
  const getBotResponse = (userMessage: string): string => {
    const m = userMessage.toLowerCase();

    if (m.includes("library") || m.includes("book"))
      return "📚 The Central Library is in the main academic block. Open 8 AM–11 PM during exams. Want directions?";
    if (m.includes("hostel") || m.includes("accommodation"))
      return "🏠 We have 6 hostels — 2 boys, 2 girls, 1 international & 1 guest house. Which one do you need info on?";
    if (m.includes("cafeteria") || m.includes("food") || m.includes("eat"))
      return "🍽️ Three cafeterias on campus:\n• Main Cafeteria (near Admin Block) — Low crowd\n• Hostel Cafeteria\n• Science Block Canteen";
    if (m.includes("bus") || m.includes("shuttle"))
      return "🚌 Campus shuttles run every 15 min from 8 AM–8 PM. Next shuttle to hostels: ~10 min from the Main Gate.";
    if (m.includes("sports") || m.includes("gym"))
      return "🏋️ The Sports Complex has a gym, badminton courts, basketball court & cricket ground — near Boys Hostel.";
    if (
      m.includes("computer") ||
      m.includes(" cs ") ||
      m.includes("cs dept")
    )
      return "💻 Computer Science dept is in the Engineering Block, 2nd floor. Labs on the 3rd floor.";
    if (m.includes("engineering") || m.includes("tech"))
      return "⚙️ Engineering Block houses CS, Electronics & Mechanical depts — east of the main Admin building.";
    if (
      m.includes("direction") ||
      m.includes("navigate") ||
      m.includes("route") ||
      m.includes("how to get")
    )
      return "🗺️ Tell me your start & destination and I'll help! Or visit the Routes page to use our route planner.";
    if (m.includes("map"))
      return "🗺️ Check out the Campus Map to see all buildings and facilities interactively.";
    if (m.includes("emergency") || m.includes("sos"))
      return "🚨 Use the red SOS button (bottom-left) for emergencies.\nSecurity: 0522-2440999\nHealth Center: 0522-2440888";
    if (m.includes("seat") || m.includes("available") || m.includes("vacant"))
      return "💺 Library: 45 seats free. Computer Lab 1: 12 seats free. Would you like to reserve one?";
    if (m.includes("crowd") || m.includes("busy"))
      return "📊 Current crowd levels:\n• Library: High (85%)\n• Main Cafeteria: Low\n• Sports Complex: Low\n• Computer Labs: Medium";
    if (m.includes("hello") || m.includes("hi") || m.includes("hey"))
      return "👋 Hi there! Ask me about locations, directions, schedules, or facilities on the BBAU campus.";
    if (m.includes("thank"))
      return "😊 You're welcome! Feel free to ask anytime.";

    return "I can help you with:\n• Finding buildings & locations\n• Getting directions\n• Bus schedules\n• Facility info\n• Seat availability\n• Emergency contacts\n\nWhat would you like to know?";
  };

  /* ── Send message ────────────────────────────────────── */
  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMsg.text),
        sender: "bot",
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);

      if ("speechSynthesis" in window) {
        const utt = new SpeechSynthesisUtterance(botMsg.text);
        utt.rate = 1;
        window.speechSynthesis.speak(utt);
      }
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const quickActions = [
    "Where is the library?",
    "Show bus schedule",
    "I need directions",
    "Check seat availability",
  ];

  /* ── Render ──────────────────────────────────────────── */
  return (
    <>
      {/* Floating toggle button */}
      <button
        type="button"
        className={`${styles.chatBtn} ${open ? styles.chatBtnActive : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close campus assistant" : "Open campus assistant"}
      >
        {open ? (
          <i className="bi bi-x-lg" aria-hidden />
        ) : (
          <i className="bi bi-chat-dots-fill" aria-hidden />
        )}
        {!open && <span className={styles.badge} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Campus Assistant Chat">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerAvatar}>
              <i className="bi bi-robot" aria-hidden />
            </div>
            <div className={styles.headerInfo}>
              <h2 className={styles.headerTitle}>Campus Assistant</h2>
              <span className={styles.headerStatus}>
                <span className={styles.dot} />
                Online · Voice enabled
              </span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.msgRow} ${
                  msg.sender === "user" ? styles.msgRowUser : styles.msgRowBot
                }`}
              >
                {msg.sender === "bot" && (
                  <div className={styles.avatar}>
                    <i className="bi bi-robot" aria-hidden />
                  </div>
                )}
                <div
                  className={`${styles.bubble} ${
                    msg.sender === "user" ? styles.bubbleUser : styles.bubbleBot
                  }`}
                >
                  <p className={styles.bubbleText}>{msg.text}</p>
                  <span className={styles.bubbleTime}>
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className={`${styles.msgRow} ${styles.msgRowBot}`}>
                <div className={styles.avatar}>
                  <i className="bi bi-robot" aria-hidden />
                </div>
                <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typingBubble}`}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions (only at start) */}
          {messages.length <= 2 && (
            <div className={styles.quickActions}>
              <p className={styles.quickLabel}>Quick questions:</p>
              <div className={styles.quickGrid}>
                {quickActions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={styles.quickBtn}
                    onClick={() => {
                      setInputText(q);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className={styles.inputBar}>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              className={styles.input}
              aria-label="Type your message"
            />
            {recognition && (
              <button
                type="button"
                className={`${styles.iconBtn} ${isListening ? styles.iconBtnActive : ""}`}
                onClick={handleVoice}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                <i
                  className={`bi ${isListening ? "bi-mic-mute-fill" : "bi-mic-fill"}`}
                  aria-hidden
                />
              </button>
            )}
            <button
              type="button"
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!inputText.trim()}
              aria-label="Send message"
            >
              <i className="bi bi-send-fill" aria-hidden />
            </button>
          </div>

          {isListening && (
            <p className={styles.listeningHint}>🎤 Listening…</p>
          )}
        </div>
      )}
    </>
  );
}
