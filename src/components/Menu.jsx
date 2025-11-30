import React, { useEffect, useState, useMemo } from 'react';
import AccountCard from './AccountCard';
import { API_URL } from '../data/ApiPath';

const FALLBACK_IMAGE = '/mnt/data/carddddd.jpg';

const Menu = ({ search = "" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // selected filter
  const [selectedFilter, setSelectedFilter] = useState('all');
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/post/all-posts`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.posts || [];
      const normalized = list.map(p => ({
        ...p,
        type: (p.type || '').toString(),
        image: p.image
          ? (p.image.startsWith('http') ? p.image : `${API_URL}/uploads/${p.image}`)
          : FALLBACK_IMAGE
      }));

      setPosts(normalized);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // LISTEN FOR NEW POSTS FROM AddProduct (so UI updates without reload)
  useEffect(() => {
    const handleNewPost = (e) => {
      const newPost = e?.detail;
      if (newPost) {
        // normalize incoming single post then prepend
        const img = newPost.image
          ? (newPost.image.startsWith('http') ? newPost.image : `${API_URL}/uploads/${newPost.image}`)
          : FALLBACK_IMAGE;
        const normalizedPost = { ...newPost, image: img, type: (newPost.type || '').toString() };
        setPosts(prev => [normalizedPost, ...prev]);
      } else {
        // if no detail provided, fallback to full refresh
        fetchPosts();
      }
    };

    // expose manual refresh function
    window.refreshMenu = fetchPosts;
    window.addEventListener('newPost', handleNewPost);
    return () => {
      window.removeEventListener('newPost', handleNewPost);
      try { delete window.refreshMenu; } catch (err) {}
    };
  }, []); // run once

  // filtering logic
  const filteredPosts = useMemo(() => {
    const q = (search || '').trim().toLowerCase();

    return posts.filter(p => {
      const t = (p.type || '').toLowerCase();
      const MAIN = ['instagram', 'youtube', 'x', 'telegram'];

      // 1) FILTER BUTTON LOGIC
      if (selectedFilter !== 'all') {
        if (selectedFilter === 'others') {
          // all types NOT in MAIN
          if (MAIN.includes(t)) return false;
        } else {
          // normal filter match
          if (t !== selectedFilter) return false;
        }
      }

      // 2) SEARCH LOGIC
      if (!q) return true;

      const fields = [
        p.type || "",
        p.id || "",
        p.username || "",
        p.selectedCategory || "",
        Array.isArray(p.category) ? p.category.join(" ") : p.category || "",
        p.info || "",
        String(p.price || "")
      ];

      return fields.join(" ").toLowerCase().includes(q);
    });
  }, [posts, search, selectedFilter]);

  // filter button
  const FilterButton = ({ label, value }) => (
    <button
      className={`filter-btn ${selectedFilter === value ? 'filter-active' : ''}`}
      onClick={() => setSelectedFilter(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="menu">
      <div className="filter-bar" role="toolbar" aria-label="filters">
        <FilterButton label="All" value="all" />
        <FilterButton label="Instagram" value="instagram" />
        <FilterButton label="YouTube" value="youtube" />
        <FilterButton label="X" value="x" />
        <FilterButton label="Telegram" value="telegram" />
        <FilterButton label="Games & Others" value="others" />
      </div>

      <div className="menu-content">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="sub-cards">
            {filteredPosts.length === 0 && <div>No posts found</div>}
            {filteredPosts.map((p) => (
              <AccountCard key={p._id || p.id || `${p.type}-${Math.random()}`} item={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
