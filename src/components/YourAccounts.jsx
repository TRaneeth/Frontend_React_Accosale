import React, { useEffect, useState } from "react";
import { API_URL } from "../data/ApiPath";
import { useNavigate } from "react-router-dom";

const YourAccounts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      const res = await fetch(`${API_URL}/post/my-posts`, {
        headers: { token },
      });

      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

    const deletePost = async (postId) => {
        const token = localStorage.getItem("loginToken");
        if (!token) { alert("Please login"); return; }
        const ok = confirm("Are you sure want to delete this post?");
        if (!ok) return;
        // optimistic UI update: remove immediately
        const previous = posts;
        setPosts(prev => prev.filter(p => p._id !== postId));
        try {
            const res = await fetch(`${API_URL}/post/${postId}`, {
            method: "DELETE",
            headers: { token }
        });
        // if backend returns JSON message
        const data = await res.json();
        if (!res.ok) {
            setPosts(previous);
            console.error("Delete failed:", data);
            alert(data.message || data.error || "Delete failed");
            return;
        }
        } catch (err) {
            setPosts(previous);
            console.error(err);
            alert("Network error. Try again.");
        }
    };


  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) return <div className="your-accounts-page"><h2>Loading...</h2></div>;

  return (
    <div className="your-accounts-page">
      <div className="your-accounts-header">
        <h2>Your Accounts</h2>
        <button className="go-home-btn" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="no-posts">You haven't posted anything yet.</p>
      ) : (
        <div className="accounts-list">
          {posts.map((p) => (
            <div className="account-card" key={p._id}>
              {p.image && (
                <img src={`${API_URL}/uploads/${p.image}`} alt="post" 
                style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",   
                    objectPosition: "center" 
                }}/>
              )}
              <div className="account-info">
                <h4>{p.type}</h4>
                <p>{p.id}</p>
                <p>{p.category[0].replace(/^\w/, c => c.toUpperCase())} - {p.selectedCategory}</p>
                <p>Price : ₹{p.price}</p>
                <p>Link : {p.link}</p>
                <p>{p.info}</p>
              </div>
              <button className="delpost" onClick={() => deletePost(p._id)}>Delete post</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourAccounts;
