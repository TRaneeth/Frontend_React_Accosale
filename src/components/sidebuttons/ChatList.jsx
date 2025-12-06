// small, ready-to-paste replacement for your ChatList component
import React, { useEffect, useState } from "react";
import { API_URL } from "../../data/ApiPath";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [chats, setChats] = useState(null); // <- null = loading
  const navigate = useNavigate();
  const myId = localStorage.getItem("userId");

  const loadChats = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      const res = await fetch(`${API_URL}/chat/mychats`, { headers: { token } });
      const data = await res.json();
      setChats(data || []);
    } catch (err) {
      console.error("loadChats error", err);
      setChats([]); // show "No chats yet." on error
    }
  };

  useEffect(() => {
    loadChats();
    window.addEventListener("refreshChats", loadChats);
    window.addEventListener("userLoggedIn", loadChats);
    return () => {
      window.removeEventListener("refreshChats", loadChats);
      window.removeEventListener("userLoggedIn", loadChats);
    };
  }, []);

  return (
    <div className="chat-list-page">
      <div className="chathead">
        <h2>Your Chats</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>

      {chats === null && <p>Loading...</p>}
      {chats !== null && chats.length === 0 && <p>No chats yet.</p>}

      {chats && chats.map((c) => {
        const other = c.participants?.find((p) => p._id !== myId);
        const lastMsg =
          c.messages?.length > 0 ? c.messages[c.messages.length - 1].text : "No messages yet";

        return (
          <div
            key={c._id}
            className="chat-item"
            onClick={() => navigate(`/chat/${c._id}`, { state: { chat: c } })}
          >
            <div style={{ fontWeight: "700" }}>{other?.username || "Unknown User"}</div>
            <div style={{ opacity: 0.85 }}>{lastMsg}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
