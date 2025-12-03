import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { API_URL } from "../data/ApiPath";

const AccountCard = ({ item }) => {
  const nav = useNavigate();
  const avatar = item.image ? item.image : '/mnt/data/carddddd.jpg';

  const openChat = async () => {
    const token = localStorage.getItem("loginToken");
    const me = localStorage.getItem("userId");

    if (!token || !me) {
      return toast.error("Please login first!");
    }

    // POST OWNER — array lo untadhi
    const otherUser = item.user?.[0];

    if (!otherUser) {
      return toast.error("Seller not found for this post");
    }

    try {
      const res = await fetch(`${API_URL}/chat/open`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify({ otherUser })
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.error || "Failed to open chat");
      }

      // Navigate to chat
      nav(`/chat/${data._id}`, { state: { chat: data } });
    } catch (err) {
      console.error(err);
      toast.error("Chat error");
    }
  };

  const handleWishlist = () => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      toast.error("Please login!");
      return;
    }
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some((w) => w._id === item._id);
    if (!exists) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist! 💙");
    } else {
      toast("Already in wishlist!");
    }
  };

  return (
    <div className="acco-card">
      <div className="acco-top">
        <div className="acco-avatar">
          <img src={avatar} alt={item.username || "avatar"} />
        </div>

        <div className="acco-meta">
          <div className="acco-type">{item.type || item.selectedCategory}</div>
          <div className="acco-name">{item.id}</div>

          {item.category?.length > 0 && item.selectedCategory && (
            <div className="acco-metric">
              {item.category[0]} : {item.selectedCategory}
            </div>
          )}

          <div className="acco-price">Rs.{item.price}</div>
        </div>
      </div>

      <div className="acco-body">
        <div className="acco-field">
          <span>link:</span> <span className="link-text">{item.link}</span>
        </div>

        <div className="acco-about">
          <p>{item.info || "No description provided."}</p>
        </div>
      </div>

      <div className="acco-footer">
        <button className="btn btn-primary" onClick={openChat}>chat</button>

        <button className="btn btn-primary btn-outline" onClick={handleWishlist}>
          Add to wishlist
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
