import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../../data/ApiPath";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ChatWindow = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const preChat = location.state?.chat || null;

  const [chat, setChat] = useState(preChat);
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);
  const me = localStorage.getItem("userId");

  const markChatRead = async (chatId) => {
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) return;
      await fetch(`${API_URL}/chat/mark-read/${chatId}`, {
        method: "POST",
        headers: { token }
      });
      // update badge/list
      window.dispatchEvent(new Event("refreshChats"));
    } catch (err) {
      console.error('markChatRead err', err);
    }
  };

  const loadChat = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) return;

      if (!chat) {
        const resAll = await fetch(`${API_URL}/chat/mychats`, { headers: { token } });
        if (resAll.ok) {
          const all = await resAll.json();
          const found = all.find((c) => c._id === id);
          if (found) setChat(found);
        }
      }

      const res = await fetch(`${API_URL}/chat/messages/${id}`, { headers: { token } });
      if (!res.ok) return;
      const data = await res.json();
      setMsgs(Array.isArray(data) ? data : []);

      // mark messages read for this chat after loading
      await markChatRead(id);
    } catch (err) {
      console.error("loadChat error", err);
    }
  };

  useEffect(() => {
    loadChat();
    const iv = setInterval(() => { loadChat(); }, 2000);
    return () => clearInterval(iv);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const sendMsg = async () => {
    if (!text.trim()) return;
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) return;

      const res = await fetch(`${API_URL}/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ chatId: id, text })
      });

      if (!res.ok) {
        console.error("send failed", res.status);
        return;
      }

      const newMsg = await res.json();
      setMsgs((p) => [...p, newMsg]);
      setText("");
      await loadChat();
      window.dispatchEvent(new Event("refreshChats"));
    } catch (err) {
      console.error("sendMsg error", err);
    }
  };

  const other = chat?.participants?.find((p) => p._id !== me);

  return (
    <div className="chat-window">
      <div className="chat-top">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h3>{other?.username || "Chat"}</h3>
      </div>

      <div className="chat-body">
        {msgs.map((m, i) => {
          const senderId = typeof m.sender === "string" ? m.sender : (m.sender?._id || m.sender);
          const mine = senderId === me;
          return (
            <div key={i} className={`msg ${mine ? "me" : "them"}`}>
              <div>{m.text}</div>
              <div className="msg-time">
                {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMsg()}
        />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
