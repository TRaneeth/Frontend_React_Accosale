import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/ApiPath';

const YourAccounts = ({ onClose }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem('loginToken');
      const res = await fetch(`${API_URL}/post/my-posts`, {
        headers: { token }
      });
      const data = await res.json();
      if (res.ok) setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyPosts(); }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="your-accounts-modal">
      <button onClick={onClose}>×</button>
      <h2>Your Accounts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Post one from "Post An Account".</p>
      ) : (
        <div className="cards">
          {posts.map(p => (
            <div className="card" key={p._id}>
              <h4>{p.type} — {p.selectedCategory}</h4>
              <p>Price: ₹{p.price}</p>
              {p.image && <img src={`${API_URL}/uploads/${p.image}`} alt="post" />}
              <p>{p.info}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourAccounts;