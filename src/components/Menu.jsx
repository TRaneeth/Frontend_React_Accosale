import React, { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import { API_URL } from '../data/ApiPath'; // make sure this file exports API_URL

const FALLBACK_IMAGE = '/mnt/data/carddddd.jpg'; // your uploaded sketch file

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // reusable fetch
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/post/all-posts`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.posts || [];
      // normalize image URL if backend returns filename
      const normalized = list.map(p => ({
        ...p,
        image: p.image
          ? (p.image.startsWith('http') ? p.image : `${API_URL}/uploads/${p.image}`)
          : FALLBACK_IMAGE
      }));
      setPosts(normalized);
      setError(null);
    } catch (err) {
      console.error('Fetch posts error', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchPosts();

    // handle custom event: if detail (new post) provided, add to top; otherwise refresh
    const handleNewPost = (e) => {
      const newPost = e?.detail;
      if (newPost) {
        // normalize image
        const img = newPost.image
          ? (newPost.image.startsWith('http') ? newPost.image : `${API_URL}/uploads/${newPost.image}`)
          : FALLBACK_IMAGE;
        setPosts(prev => [{ ...newPost, image: img }, ...prev]);
      } else {
        fetchPosts();
      }
    };

    window.addEventListener('newPost', handleNewPost);

    // expose a global refresh function (you can call window.refreshMenu() after POST)
    window.refreshMenu = fetchPosts;

    return () => {
      window.removeEventListener('newPost', handleNewPost);
      // optional: cleanup global (avoid deleting if other scripts rely on it)
      try { delete window.refreshMenu; } catch (e) {}
    };
  }, []);

  return (
    <div className="menu">
      <div className="filter-bar">
        <button><span>🔎</span> filters</button>
        <button>All</button>
        <button>Instagram</button>
        <button>YouTube</button>
        <button>X</button>
        <button>Telegram</button>
        <button>Games</button>
      </div>

      <div className="menu-content">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="sub-cards">
            {posts.length === 0 && <div>No posts available</div>}

            {posts.map((p) => (
              <AccountCard
                key={p._id || p.id || `${p.type}-${Math.random()}`}
                item={p}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
